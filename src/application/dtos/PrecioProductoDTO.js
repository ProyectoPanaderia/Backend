class PrecioProductoDTO {
  constructor({ nombre, valor, fecha, productoId }) {
    this.nombre = nombre;
    this.valor = valor;
    this.productoId = productoId;
    this.fecha = fecha;
  }
}
module.exports = PrecioProductoDTO;