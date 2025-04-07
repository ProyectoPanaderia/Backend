class LineaRemito {
  constructor(id, subtotal, cantidad, remitoId) {
    if (id == null || subtotal == null || cantidad == null || remitoId == null) {
      throw new Error("Todos los campos son obligatorios");
    }

    this.id = id;
    this.subtotal = subtotal;
    this.cantidad = cantidad;
    this.remitoId = remitoId;
  }
}

module.exports = LineaRemito;
