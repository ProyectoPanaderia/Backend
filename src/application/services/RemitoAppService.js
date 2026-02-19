const CreateRemitoDTO = require('../dtos/RemitoDTO/CreateRemitoDTO');
const UpdateRemitoDTO = require('../dtos/RemitoDTO/UpdateRemitoDTO');
const RemitoFilterDTO = require('../dtos/RemitoDTO/RemitoFilterDTO');
const remitoDTO = require('../dtos/RemitoDTO/RemitoDTO');

class RemitoAppService {
/**
   * @param {{ 
   * remitoRepo: import('../../domain/repositories/remitoRepository'), 
   * clienteRepo: import('../../domain/repositories/clienteRepository'), 
   * repartoRepo: import('../../domain/repositories/repartoRepository'),
   * pedidoRepo: import('../../domain/repositories/pedidoRepository') 
   * }} deps
   */
  constructor({ remitoRepo, clienteRepo, repartoRepo, pedidoRepo }) {
    this.remitoRepo = remitoRepo;
    this.clienteRepo = clienteRepo;
    this.repartoRepo = repartoRepo;
    this.pedidoRepo = pedidoRepo;
  }

  // Crear nuevo remito (venta)
  async crear(payload) {
    const dto = new CreateRemitoDTO(payload);

    // Validar que el cliente existe (si se proporciona)
    if (dto.clienteId) {
      const cliente = await this.clienteRepo.findById(dto.clienteId);
      if (!cliente) throw new Error('Cliente no encontrado');
    }

    // Validar que el reparto existe
    const reparto = await this.repartoRepo.findById(dto.repartoId);
    if (!reparto) throw new Error('Reparto no encontrado');

    const created = await this.remitoRepo.create(dto);

    if (dto.pedidoOrigenId) {
      try {
        // Intentamos cambiar el estado del pedido original a 'Completado'
        // Nos aseguramos de que el método updateEstado exista en el repo de Pedidos
        if (this.pedidoRepo && typeof this.pedidoRepo.updateEstado === 'function') {
           await this.pedidoRepo.updateEstado(dto.pedidoOrigenId, 'Completado');
        } else {
           console.warn("pedidoRepo.updateEstado no está definido. No se pudo actualizar el estado del pedido.");
        }
      } catch (error) {
        // Atrapamos el error pero no frenamos el proceso principal
        // El remito ya se creó y descontó stock correctamente.
        console.error(`Error al intentar actualizar el estado del pedido ${dto.pedidoOrigenId}:`, error);
      }
    }

    return { data: remitoDTO(created) };
  }

  // Listar remitos con filtros y paginación
  async listar(query) {
    const filter = new RemitoFilterDTO(query);
    const result = await this.remitoRepo.findAll(filter);
    return {
      data: result.data.map(remitoDTO),
      meta: result.meta,
    };
  }

  // Obtener remito por ID
  async obtener(id) {
    const remito = await this.remitoRepo.findById(Number(id));
    if (!remito) throw new Error('Remito no encontrado');
    return { data: remitoDTO(remito) };
  }

  // Editar remito existente
  async editar(id, payload) {
    const dto = new UpdateRemitoDTO(payload);

    // Validar cliente si se actualiza
    if (dto.clienteId !== undefined && dto.clienteId) {
      const cliente = await this.clienteRepo.findById(dto.clienteId);
      if (!cliente) throw new Error('Cliente no encontrado');
    }

    // Validar reparto si se actualiza
    if (dto.repartoId !== undefined) {
      const reparto = await this.repartoRepo.findById(dto.repartoId);
      if (!reparto) throw new Error('Reparto no encontrado');
    }

    const updated = await this.remitoRepo.update(Number(id), dto);
    if (!updated) throw new Error('Remito no encontrado');
    return { data: remitoDTO(updated) };
  }

  // Eliminar remito
  async eliminar(id) {
    const ok = await this.remitoRepo.delete(Number(id));
    if (!ok) throw new Error('Remito no encontrado');
    return { data: { ok: true } };
  }

  // Obtener total de ventas (para reportes)
  async obtenerTotalVentas(filtro = {}) {
    const result = await this.remitoRepo.findAll(new RemitoFilterDTO(filtro));
    const totalVentas = result.data.reduce((sum, remito) => sum + remito.total, 0);
    return {
      data: {
        totalVentas,
        cantidadVentas: result.data.length,
        promedioVenta: result.data.length > 0 ? totalVentas / result.data.length : 0
      }
    };
  }
}

module.exports = RemitoAppService;