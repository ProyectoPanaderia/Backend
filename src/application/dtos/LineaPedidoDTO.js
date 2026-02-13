class LineaPedidoDTO {
  constructor({ id, cantidad, pedidoId, productoId, descripcion, precioUnitario }) {
    this.id = id;
    this.cantidad = cantidad;
    this.pedidoId = pedidoId;
    this.productoId = productoId;
    this.descripcion = descripcion;
    this.precioUnitario = precioUnitario;
  }
}
module.exports = LineaPedidoDTO;