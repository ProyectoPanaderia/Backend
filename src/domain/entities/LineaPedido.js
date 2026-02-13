class LineaPedido {
  constructor(id, cantidad, pedidoId, productoId, precioUnitario, descripcion
  ) {
    if (id == null || cantidad == null || pedidoId == null || productoId == null || precioUnitario == null || descripcion == null) {
      throw new Error("Todos los campos son obligatorios");
    }

    this.id = id;
    this.cantidad = cantidad;
    this.pedidoId = pedidoId;
    this.productoId = productoId;
    this.precioUnitario = precioUnitario;
    this.descripcion = descripcion;
  }
}

module.exports = LineaPedido;
