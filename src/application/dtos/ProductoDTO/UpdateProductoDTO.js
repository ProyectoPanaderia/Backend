class UpdateProductoDTO {
  /**
   * @param {{ nombre?:any, peso?:any }} param0
   */
  constructor({ nombre, peso } = {}) {
    if (nombre !== undefined) {
      if (typeof nombre !== 'string' || !nombre.trim()) throw new Error('nombre inválido');
      this.nombre = nombre.trim();
    }
    if (peso !== undefined) {
      if (isNaN(peso)) throw new Error('peso inválido');
      const p = Number(peso);
      if (p <= 0) throw new Error('peso debe ser > 0');
      this.peso = p;
    }
    if (this.nombre === undefined && this.peso === undefined)
      throw new Error('sin cambios');
  }
}
module.exports = UpdateProductoDTO;