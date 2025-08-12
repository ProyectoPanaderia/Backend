class LineaPedidoDTO {
  constructor({ id, cantidad, pedidoId, productoId }) {
    this.id = id;
    this.cantidad = cantidad;
    this.pedidoId = pedidoId;
    this.productoId = productoId;
  }
}
module.exports = LineaPedidoDTO;