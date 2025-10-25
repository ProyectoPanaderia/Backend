class UpdateClienteDTO {
  /**
   * @param {{ nombre?:any, ciudadId?:any }} param0
   */
  constructor({ nombre, ciudadId } = {}) {
    if (nombre !== undefined) {
      if (typeof nombre !== 'string' || !nombre.trim())
        throw new Error('nombre inválido');
      this.nombre = nombre.trim();
    }

    if (ciudadId !== undefined) {
      if (isNaN(ciudadId))
        throw new Error('ciudadId inválido');
      this.ciudadId = Number(ciudadId);
    }

    if (this.nombre === undefined && this.ciudadId === undefined)
      throw new Error('sin cambios');
  }
}

module.exports = UpdateClienteDTO;