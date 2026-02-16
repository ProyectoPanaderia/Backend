const CreateEmpleadoDTO = require('../dtos/EmpleadoDTO/CreateEmpleadoDTO');
const UpdateEmpleadoDTO = require('../dtos/EmpleadoDTO/UpdateEmpleadoDTO');
const EmpleadoFilterDTO = require('../dtos/EmpleadoDTO/EmpleadoFilterDTO');
const empleadoDTO = require('../dtos/EmpleadoDTO/EmpleadoDTO');

class EmpleadoAppService {
  /**
   * @param {{ empleadoRepo: import('../../domain/repositories/empleadoRepository'), repartoRepo: import('../../domain/repositories/repartoRepository') }} deps
   */
  constructor({ empleadoRepo, repartoRepo }) {
    this.empleadoRepo = empleadoRepo;
    this.repartoRepo = repartoRepo;
  }

  async crear(payload) {
    const dto = new CreateEmpleadoDTO(payload);

    // Validar que el reparto existe
    const reparto = await this.repartoRepo.findById(dto.repartoId);
    if (!reparto) throw new Error('Reparto no encontrado');

    const created = await this.empleadoRepo.create(dto);
    return { data: empleadoDTO(created) };
  }

  async listar(query) {
    const filter = new EmpleadoFilterDTO(query);
    const result = await this.empleadoRepo.findAll(filter);
    return {
      data: result.data.map(empleadoDTO),
      meta: result.meta,
    };
  }

  async obtener(id) {
    const empleado = await this.empleadoRepo.findById(Number(id));
    if (!empleado) throw new Error('Empleado no encontrado');
    return { data: empleadoDTO(empleado) };
  }

  async obtenerPorReparto(repartoId) {
    const empleados = await this.empleadoRepo.findByRepartoId(Number(repartoId));
    if (!empleados || empleados.length === 0) {
      throw new Error('No hay empleados para este reparto');
    }
    
    return {
      data: empleados.map(empleadoDTO),
      meta: { total: empleados.length }
    };
  }

  async editar(id, payload) {
    const dto = new UpdateEmpleadoDTO(payload);

    if (dto.repartoId !== undefined) {
      const reparto = await this.repartoRepo.findById(dto.repartoId);
      if (!reparto) throw new Error('Reparto no encontrado');
    }

    const updated = await this.empleadoRepo.update(Number(id), dto);
    if (!updated) throw new Error('Empleado no encontrado');
    return { data: empleadoDTO(updated) };
  }

  async eliminar(id) {
    const ok = await this.empleadoRepo.delete(Number(id));
    if (!ok) throw new Error('Empleado no encontrado');
    return { data: { ok: true } };
  }
}

module.exports = EmpleadoAppService;