class LineaRemito {
  constructor(id, subtotal, cantidad, remitoId, existenciaId = null) {
    if (id == null || subtotal == null || cantidad == null || remitoId == null || existenciaId == null) {
      throw new Error("Todos los campos son obligatorios");
    }

    this.id = id;
    this.subtotal = subtotal;
    this.cantidad = cantidad;
    this.remitoId = remitoId;
    this.existenciaId = existenciaId;
  }
}

module.exports = LineaRemito;
