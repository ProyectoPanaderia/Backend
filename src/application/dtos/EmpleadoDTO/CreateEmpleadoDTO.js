class CreateEmpleadoDTO {
  /**
   * @param {{ nombre: any, repartoId: any, usuarioId: any }} param0
   */
  constructor({ nombre, repartoId, usuarioId }) {
    
    if (!nombre || typeof nombre !== 'string' || !nombre.trim()) {
      throw new Error('nombre requerido y debe ser un texto válido');
    }

    if (!repartoId || isNaN(Number(repartoId))) {
      throw new Error('repartoId requerido y debe ser numérico');
    }

    if (!usuarioId || isNaN(Number(usuarioId))) {
      throw new Error('usuarioId requerido y debe ser numérico');
    }

    this.nombre = nombre.trim();
    this.repartoId = Number(repartoId);
    this.usuarioId = Number(usuarioId);
  }
}

module.exports = CreateEmpleadoDTO;