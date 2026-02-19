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

    // 1. Validar que el reparto existe
    const reparto = await this.repartoRepo.findById(dto.repartoId);
    if (!reparto) throw new Error('Reparto no encontrado');

    // 2. NUEVO: Validar que el usuario no tenga ya un empleado asignado
    const existente = await this.empleadoRepo.findAll({ usuarioId: dto.usuarioId });
    if (existente.data.length > 0) {
      throw new Error('Este usuario ya tiene un perfil de empleado asignado');
    }

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

  async obtenerPorUsuario(usuarioId) {
  // Buscamos al empleado vinculado a este ID de usuario
  const result = await this.empleadoRepo.findAll({ usuarioId: Number(usuarioId) });
  
  if (!result.data || result.data.length === 0) {
    throw new Error('No hay un perfil de empleado para este usuario');
  }
  
  // Como es 1:1, devolvemos el primero
  return { data: empleadoDTO(result.data[0]) };
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