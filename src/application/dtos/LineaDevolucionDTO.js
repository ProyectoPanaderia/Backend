class LineaDevolucionDTO {
  constructor({ id, cantidad, existenciaId, devolucionId, precioUnitario, subtotal } = {}) {
    this.id = id;
    this.cantidad = cantidad;
    this.existenciaId = existenciaId;
    this.devolucionId = devolucionId;
    this.precioUnitario = precioUnitario;
    this.subtotal = subtotal;
  }
}
module.exports = LineaDevolucionDTO;