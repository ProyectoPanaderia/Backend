class UpdatePrecioProductoDTO {
  constructor({ nombre, valor, fecha, productoId }) {
    if (nombre !== undefined) this.nombre = nombre;
    if (valor !== undefined) this.valor = Number(valor);
    if (fecha !== undefined) this.fecha = fecha;
    if (productoId !== undefined) this.productoId = Number(productoId);
  }
}

module.exports = UpdatePrecioProductoDTO;