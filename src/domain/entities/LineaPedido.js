class LineaPedido {
  constructor(id, cantidad, pedidoId, productoId) {
    if (id == null || cantidad == null || pedidoId == null || productoId == null) {
      throw new Error("Todos los campos son obligatorios");
    }

    this.id = id;
    this.cantidad = cantidad;
    this.pedidoId = pedidoId;
    this.productoId = productoId;
  }
}

module.exports = LineaPedido;
