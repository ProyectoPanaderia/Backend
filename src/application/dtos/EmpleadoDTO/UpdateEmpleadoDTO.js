class UpdateEmpleadoDTO {
  /**
   * @param {{ nombre?: any, apellido?: any, email?: any, telefono?: any, repartoId?: any }} param0
   */
  constructor({ nombre, apellido, email, telefono, repartoId } = {}) {
    
    if (nombre !== undefined && (!nombre || typeof nombre !== 'string' || !nombre.trim())) {
      throw new Error('nombre debe ser un texto válido');
    }

    if (apellido !== undefined && (!apellido || typeof apellido !== 'string' || !apellido.trim())) {
      throw new Error('apellido debe ser un texto válido');
    }

    if (email !== undefined) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error('email debe ser válido');
      }
    }

    if (repartoId !== undefined && isNaN(Number(repartoId))) {
      throw new Error('repartoId debe ser numérico');
    }

    if (nombre !== undefined) this.nombre = nombre.trim();
    if (apellido !== undefined) this.apellido = apellido.trim();
    if (email !== undefined) this.email = email.toLowerCase();
    if (telefono !== undefined) this.telefono = telefono || null;
    if (repartoId !== undefined) this.repartoId = Number(repartoId);

    if (
      this.nombre === undefined &&
      this.apellido === undefined &&
      this.email === undefined &&
      this.telefono === undefined &&
      this.repartoId === undefined
    ) {
      throw new Error('sin cambios para actualizar');
    }
  }
}

module.exports = UpdateEmpleadoDTO;