class LineaRemitoDTO {
  constructor({ id, subtotal, cantidad, remitoId, existenciaId }) {
    this.id = id;
    this.subtotal = subtotal;
    this.cantidad = cantidad;
    this.remitoId = remitoId;
    this.existenciaId = existenciaId;
  }
}
module.exports = LineaRemitoDTO;