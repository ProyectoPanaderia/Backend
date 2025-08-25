
class CreateProductoDTO {
  /**
   * @param {{ nombre:any, peso:any }} param0
   */
  constructor({ nombre, peso }) {
    if (!nombre || typeof nombre !== 'string' || !nombre.trim())
      throw new Error('nombre requerido');
    if (peso == null || isNaN(peso)) throw new Error('peso inválido');
    const p = Number(peso);
    if (p <= 0) throw new Error('peso debe ser > 0');

    this.nombre = nombre.trim();
    this.peso = p;
  }
}
module.exports = CreateProductoDTO;
