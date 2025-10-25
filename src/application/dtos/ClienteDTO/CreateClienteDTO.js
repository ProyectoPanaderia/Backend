class CreateClienteDTO {
  /**
   * @param {{ nombre:any, ciudadId:any }} param0
   */
  constructor({ nombre, ciudadId }) {
    if (!nombre || typeof nombre !== 'string' || !nombre.trim())
      throw new Error('nombre requerido');

    if (ciudadId == null || isNaN(ciudadId))
      throw new Error('ciudadId inválido');

    this.nombre = nombre.trim();
    this.ciudadId = Number(ciudadId);
  }
}

module.exports = CreateClienteDTO;