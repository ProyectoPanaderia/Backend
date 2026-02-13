const CreateLineaPedidoDTO = require('../dtos/LineaPedidoDTO/CreateLineaPedidoDTO');
const UpdateLineaPedidoDTO = require('../dtos/LineaPedidoDTO/UpdateLineaPedidoDTO');
const LineaPedidoFilterDTO = require('../dtos/LineaPedidoDTO/LineaPedidoFilterDTO');
const lineaPedidoDTO = require('../dtos/LineaPedidoDTO/LineaPedidoDTO');

class LineaPedidoAppService {
  /**
   * Necesitamos pedidoRepo para actualizar el total del pedido
   * cada vez que modificamos sus líneas.
   */
  constructor({ lineaPedidoRepo, pedidoRepo }) {
    this.lineaPedidoRepo = lineaPedidoRepo;
    this.pedidoRepo = pedidoRepo;
  }

  // Agregar una línea a un pedido existente
  async crear(payload) {
    // 1. Validamos datos de la línea
    // Nota: El payload debe incluir 'pedidoId' si estamos agregando a un pedido ya existente
    const dto = new CreateLineaPedidoDTO(payload);
    
    // Asignamos el pedidoId manualmente si viene en el payload (ya que el DTO de creación anidada no lo exigía)
    const dataToSave = { ...dto, pedidoId: payload.pedidoId };
    if (!dataToSave.pedidoId) throw new Error('Para crear una línea suelta se requiere pedidoId');

    // 2. Guardamos
    const created = await this.lineaPedidoRepo.create(dataToSave);

    // 3. ACTUALIZAMOS TOTAL DEL PEDIDO
    await this._recalcularTotalPedido(dataToSave.pedidoId);

    return { data: lineaPedidoDTO(created) };
  }

  async listar(query) {
    const filter = new LineaPedidoFilterDTO(query);
    const result = await this.lineaPedidoRepo.findAll(filter);
    
    return {
      data: result.data.map(lineaPedidoDTO),
      meta: result.meta
    };
  }

  async obtener(id) {
    const linea = await this.lineaPedidoRepo.findById(Number(id));
    if (!linea) throw new Error('Línea de pedido no encontrada');
    return { data: lineaPedidoDTO(linea) };
  }

  async editar(id, payload) {
    // 1. Validamos inputs
    const dto = new UpdateLineaPedidoDTO(payload);
    
    // 2. Obtenemos la línea actual para saber a qué pedido pertenece y sus valores viejos
    const lineaActual = await this.lineaPedidoRepo.findById(Number(id));
    if (!lineaActual) throw new Error('Línea no encontrada');

    // 3. Lógica de recálculo de subtotal si cambia cantidad o precio
    const nuevaCantidad = dto.cantidad !== undefined ? dto.cantidad : lineaActual.cantidad;
    const nuevoPrecio = dto.precioUnitario !== undefined ? dto.precioUnitario : lineaActual.precioUnitario;
    
    // Preparamos objeto para actualizar
    const dataToUpdate = {
      ...dto,
      subtotal: nuevaCantidad * nuevoPrecio // Recalculamos subtotal de la línea
    };

    // 4. Actualizamos en BD
    const updated = await this.lineaPedidoRepo.update(Number(id), dataToUpdate);

    // 5. ACTUALIZAMOS TOTAL DEL PEDIDO
    await this._recalcularTotalPedido(lineaActual.pedidoId);

    return { data: lineaPedidoDTO(updated) };
  }

  async eliminar(id) {
    // 1. Buscamos primero para obtener el pedidoId
    const linea = await this.lineaPedidoRepo.findById(Number(id));
    if (!linea) throw new Error('Línea no encontrada');

    // 2. Eliminamos
    const ok = await this.lineaPedidoRepo.delete(Number(id));
    if (!ok) throw new Error('No se pudo eliminar la línea');

    // 3. ACTUALIZAMOS TOTAL DEL PEDIDO
    await this._recalcularTotalPedido(linea.pedidoId);

    return { data: { ok: true } };
  }

  // --- Helper Privado para mantener consistencia ---
  async _recalcularTotalPedido(pedidoId) {
    if (!this.pedidoRepo) return; // Seguridad por si no se inyectó

    // 1. Buscamos todas las líneas de ese pedido
    // (Asumimos que el repo tiene un método findAll que acepta filtros limpios)
    const filtro = { pedidoId: pedidoId, pageSize: 1000 }; 
    const resultado = await this.lineaPedidoRepo.findAll(filtro);
    const lineas = resultado.data || [];

    // 2. Sumamos subtotales
    const nuevoTotal = lineas.reduce((acc, l) => acc + Number(l.subtotal), 0);

    // 3. Actualizamos la cabecera del pedido
    // (Asumimos que pedidoRepo tiene un update o un método específico)
    await this.pedidoRepo.update(pedidoId, { total: nuevoTotal });
  }
}

module.exports = LineaPedidoAppService;