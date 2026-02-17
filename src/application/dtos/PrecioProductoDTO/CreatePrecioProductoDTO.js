class CreatePrecioProductoDTO {
  constructor({ nombre, valor, fecha, productoId }) {
    this.nombre = nombre;
    this.valor = Number(valor);
    this.fecha = fecha;
    this.productoId = Number(productoId);
  }
}

module.exports = CreatePrecioProductoDTO;