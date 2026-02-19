class UpdateEmpleadoDTO {
  constructor({ nombre, repartoId, usuarioId } = {}) {
    if (nombre !== undefined && (!nombre || typeof nombre !== 'string' || !nombre.trim())) {
      throw new Error('nombre debe ser un texto válido');
    }
    if (repartoId !== undefined && isNaN(Number(repartoId))) {
      throw new Error('repartoId debe ser numérico');
    }
    if (usuarioId !== undefined && isNaN(Number(usuarioId))) {
      throw new Error('usuarioId debe ser numérico');
    }

    if (nombre !== undefined) this.nombre = nombre.trim();
    if (repartoId !== undefined) this.repartoId = Number(repartoId);
    if (usuarioId !== undefined) this.usuarioId = Number(usuarioId);

    if (!this.nombre && !this.repartoId && !this.usuarioId) {
      throw new Error('sin cambios para actualizar');
    }
  }
}
module.exports = UpdateEmpleadoDTO;