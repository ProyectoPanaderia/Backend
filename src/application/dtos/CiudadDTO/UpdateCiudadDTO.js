class UpdateCiudadDTO {
  /**
   * @param {{ nombre?:any }} param0
   */
  constructor({ nombre } = {}) {
    if (nombre !== undefined) {
      if (typeof nombre !== 'string' || !nombre.trim())
        throw new Error('nombre inválido');
      this.nombre = nombre.trim();
    }

    if (this.nombre === undefined)
      throw new Error('sin cambios');
  }
}

module.exports = UpdateCiudadDTO;