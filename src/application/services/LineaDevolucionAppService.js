const CreateLineaDevolucionDTO = require('../dtos/LineaDevolucionDTO/CreateLineaDevolucionDTO');
const UpdateLineaDevolucionDTO = require('../dtos/LineaDevolucionDTO/UpdateLineaDevolucionDTO');
const LineaDevolucionFilterDTO = require('../dtos/LineaDevolucionDTO/LineaDevolucionFilterDTO');
const LineaDevolucionDTO = require('../dtos/LineaDevolucionDTO/LineaDevolucionDTO');

class LineaDevolucionAppService {

  constructor({ lineaDevolucionRepo, devolucionRepo }) {
    this.lineaDevolucionRepo = lineaDevolucionRepo;
    this.devolucionRepo = devolucionRepo;
  }

  // Agregar una línea a una devolución existente
  async crear(payload) {
    const dto = new CreateLineaDevolucionDTO(payload);
    
    const dataToSave = { ...dto, devolucionId: payload.devolucionId };
    if (!dataToSave.devolucionId) throw new Error('Para crear una línea suelta se requiere devolucionId');

    const created = await this.lineaDevolucionRepo.create(dataToSave);

    // Actualizamos el total de la cabecera
    await this._recalcularTotalDevolucion(dataToSave.devolucionId);

    return { data: new LineaDevolucionDTO(created) };
  }

  async listar(query) {
    const filter = new LineaDevolucionFilterDTO(query);
    const result = await this.lineaDevolucionRepo.findAll(filter);
    
    return {
      data: result.data.map(linea => new LineaDevolucionDTO(linea)),
      meta: result.meta
    };
  }

  async obtener(id) {
    const linea = await this.lineaDevolucionRepo.findById(Number(id));
    if (!linea) throw new Error('Línea de devolución no encontrada');
    return { data: new LineaDevolucionDTO(linea) };
  }

  async editar(id, payload) {
    // 1. Validamos inputs
    const dto = new UpdateLineaDevolucionDTO(payload);
    
    // 2. Obtenemos la línea actual para saber a qué devolución pertenece y sus valores viejos
    const lineaActual = await this.lineaDevolucionRepo.findById(Number(id));
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
    const updated = await this.lineaDevolucionRepo.update(Number(id), dataToUpdate);

    // 5. ACTUALIZAMOS TOTAL DE LA DEVOLUCION (Cabecera)
    await this._recalcularTotalDevolucion(lineaActual.devolucionId);

    return { data: new LineaDevolucionDTO(updated) };
  }

  async eliminar(id) {
    // 1. Buscamos primero para obtener el devolucionId
    const linea = await this.lineaDevolucionRepo.findById(Number(id));
    if (!linea) throw new Error('Línea no encontrada');

    // 2. Eliminamos
    const ok = await this.lineaDevolucionRepo.delete(Number(id));
    if (!ok) throw new Error('No se pudo eliminar la línea');

    // 3. ACTUALIZAMOS TOTAL DE LA DEVOLUCION (Cabecera)
    await this._recalcularTotalDevolucion(linea.devolucionId);

    return { data: { ok: true } };
  }

  // --- Helper Privado para mantener consistencia ---
  async _recalcularTotalDevolucion(devolucionId) {
    if (!this.devolucionRepo) return; // Seguridad por si no se inyectó

    // 1. Buscamos todas las líneas de esa devolución
    const filtro = { devolucionId: devolucionId, pageSize: 1000 }; 
    const resultado = await this.lineaDevolucionRepo.findAll(filtro);
    const lineas = resultado.data || [];

    // 2. Sumamos subtotales
    const nuevoTotal = lineas.reduce((acc, l) => acc + Number(l.subtotal), 0);

    // 3. Actualizamos la cabecera de la devolución
    await this.devolucionRepo.update(devolucionId, { total: nuevoTotal });
  }
}

module.exports = LineaDevolucionAppService;