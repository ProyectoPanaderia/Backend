class CreateEmpleadoDTO {
  /**
   * @param {{ nombre: any, apellido: any, email: any, telefono: any, repartoId: any }} param0
   */
  constructor({ nombre, apellido, email, telefono, repartoId }) {
    
    if (!nombre || typeof nombre !== 'string' || !nombre.trim()) {
      throw new Error('nombre requerido y debe ser un texto válido');
    }

    if (!apellido || typeof apellido !== 'string' || !apellido.trim()) {
      throw new Error('apellido requerido y debe ser un texto válido');
    }

    if (!email || typeof email !== 'string') {
      throw new Error('email requerido');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error('email debe ser válido');
    }

    if (!repartoId || isNaN(Number(repartoId))) {
      throw new Error('repartoId requerido y debe ser numérico');
    }

    this.nombre = nombre.trim();
    this.apellido = apellido.trim();
    this.email = email.toLowerCase();
    this.telefono = telefono || null;
    this.repartoId = Number(repartoId);
  }
}

module.exports = CreateEmpleadoDTO;