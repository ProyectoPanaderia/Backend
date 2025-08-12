class LineaRemitoDTO {
  constructor({ id, subtotal, cantidad, remitoId }) {
    this.id = id;
    this.subtotal = subtotal;
    this.cantidad = cantidad;
    this.remitoId = remitoId;
  }
}
module.exports = LineaRemitoDTO;