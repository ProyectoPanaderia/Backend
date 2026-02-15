const CreateRemitoDTO = require('../dtos/RemitoDTO/CreateRemitoDTO');
const UpdateRemitoDTO = require('../dtos/RemitoDTO/UpdateRemitoDTO');
const RemitoFilterDTO = require('../dtos/RemitoDTO/RemitoFilterDTO');
const remitoDTO = require('../dtos/RemitoDTO/RemitoDTO');

class RemitoAppService {
  /**
   * @param {{ remitoRepo: import('../../domain/repositories/remitoRepository'), clienteRepo: import('../../domain/repositories/clienteRepository'), repartoRepo: import('../../domain/repositories/repartoRepository') }} deps
   */
  constructor({ remitoRepo, clienteRepo, repartoRepo }) {
    this.remitoRepo = remitoRepo;
    this.clienteRepo = clienteRepo;
    this.repartoRepo = repartoRepo;
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