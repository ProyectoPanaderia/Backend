const CreateVehiculoDTO = require('../dtos/VehiculoDTO/CreateVehiculoDTO');
const UpdateVehiculoDTO = require('../dtos/VehiculoDTO/UpdateVehiculoDTO');
const VehiculoFilterDTO = require('../dtos/VehiculoDTO/VehiculoFilterDTO');
const vehiculoDTO = require('../dtos/VehiculoDTO/VehiculoDTO');

class VehiculoAppService {
  /**
   * @param {{ vehiculoRepo: import('../../domain/repositories/vehiculoRepository'), repartoRepo: import('../../domain/repositories/repartoRepository') }} deps
   */
  constructor({ vehiculoRepo, repartoRepo }) {
    this.vehiculoRepo = vehiculoRepo;
    this.repartoRepo = repartoRepo;
  }

  async crear(payload) {
    const dto = new CreateVehiculoDTO(payload);

    // Validar que el reparto existe
    const reparto = await this.repartoRepo.findById(dto.repartoId);
    if (!reparto) throw new Error('Reparto no encontrado');

    const created = await this.vehiculoRepo.create(dto);
    return { data: vehiculoDTO(created) };
  }

  async listar(query) {
    const filter = new VehiculoFilterDTO(query);
    const result = await this.vehiculoRepo.findAll(filter);
    return {
      data: result.data.map(vehiculoDTO),
      meta: result.meta,
    };
  }

  async obtener(id) {
    const vehiculo = await this.vehiculoRepo.findById(Number(id));
    if (!vehiculo) throw new Error('Vehículo no encontrado');
    return { data: vehiculoDTO(vehiculo) };
  }

  async obtenerPorReparto(repartoId) {
    const vehiculos = await this.vehiculoRepo.findByRepartoId(Number(repartoId));
    if (!vehiculos || vehiculos.length === 0) {
      throw new Error('No hay vehículos para este reparto');
    }
    
    return {
      data: vehiculos.map(vehiculoDTO),
      meta: { total: vehiculos.length }
    };
  }

  async editar(id, payload) {
    const dto = new UpdateVehiculoDTO(payload);

    if (dto.repartoId !== undefined) {
      const reparto = await this.repartoRepo.findById(dto.repartoId);
      if (!reparto) throw new Error('Reparto no encontrado');
    }

    const updated = await this.vehiculoRepo.update(Number(id), dto);
    if (!updated) throw new Error('Vehículo no encontrado');
    return { data: vehiculoDTO(updated) };
  }

  async eliminar(id) {
    const ok = await this.vehiculoRepo.delete(Number(id));
    if (!ok) throw new Error('Vehículo no encontrado');
    return { data: { ok: true } };
  }
}

module.exports = VehiculoAppService;