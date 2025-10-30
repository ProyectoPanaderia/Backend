class CreateRepartoDTO {
  /**
   * @param {{ nombre: any, tercerizado: any, estado: any }} param0
   */
  constructor({ nombre, tercerizado, estado }) {

    if (!nombre || typeof nombre !== 'string' || !nombre.trim()) {
      throw new Error('nombre requerido');
    }

    if (!tercerizado || !['S', 'N'].includes(tercerizado.toUpperCase())) {
      throw new Error("tercerizado inválido (usar 'S' o 'N')");
    }

    if (!estado || !['A', 'I'].includes(estado.toUpperCase())) {
      throw new Error("estado inválido (usar 'A' = activo o 'I' = inactivo)");
    }

    this.nombre = nombre.trim();
    this.tercerizado = tercerizado.toUpperCase();
    this.estado = estado.toUpperCase();
  }
}

module.exports = CreateRepartoDTO;