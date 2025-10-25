class CreateCiudadDTO {
  /**
   * @param {{ nombre:any }} param0
   */
  constructor({ nombre }) {
    if (!nombre || typeof nombre !== 'string' || !nombre.trim())
      throw new Error('nombre requerido');

    this.nombre = nombre.trim();
  }
}

module.exports = CreateCiudadDTO;