class UpdateRepartoDTO {
  /**
   * @param {{ nombre?: any, tercerizado?: any, estado?: any }} param0
   */
  constructor({ nombre, tercerizado, estado } = {}) {
    if (nombre !== undefined) {
      if (typeof nombre !== 'string' || !nombre.trim()) {
        throw new Error('nombre inválido');
      }
      this.nombre = nombre.trim();
    }

    if (tercerizado !== undefined) {
      const val = String(tercerizado).toUpperCase();
      if (!['S', 'N'].includes(val)) {
        throw new Error("tercerizado inválido (usar 'S' o 'N')");
      }
      this.tercerizado = val;
    }

    if (estado !== undefined) {
      const val = String(estado).toUpperCase();
      if (!['A', 'I'].includes(val)) {
        throw new Error("estado inválido (usar 'A' o 'I')");
      }
      this.estado = val;
    }

    if (
      this.nombre === undefined &&
      this.tercerizado === undefined &&
      this.estado === undefined
    ) {
      throw new Error('sin cambios');
    }
  }
}

module.exports = UpdateRepartoDTO;