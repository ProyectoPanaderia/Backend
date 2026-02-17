class PrecioProducto {
  constructor(nombre, valor, productoId, fecha) {
    if (nombre == null || valor == null || productoId == null || fecha == null) {
      throw new Error("Todos los campos son obligatorios");
    }

    this.nombre = nombre;
    this.valor = valor;
    this.productoId = productoId;
    this.fecha = fecha;
  }
}

module.exports = PrecioProducto;