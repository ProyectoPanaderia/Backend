class LineaDevolucionDTO {
  constructor({ id, cantidad, existenciaId, devolucionId }) {
    this.id = id;
    this.cantidad = cantidad;
    this.existenciaId = existenciaId;
    this.devolucionId = devolucionId;
  }
}
module.exports = LineaDevolucionDTO;