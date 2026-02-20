class LineaDevolucion {
  constructor(id, cantidad, existenciaId, devolucionId, precioUnitario, subtotal) {
    if (id == null || cantidad == null || existenciaId == null || devolucionId == null) {
      throw new Error("Faltan campos obligatorios en LineaDevolucion");
    }

    this.id = id;
    this.cantidad = cantidad;
    this.existenciaId = existenciaId;
    this.devolucionId = devolucionId;
    this.precioUnitario = Number(precioUnitario) || 0;
    this.subtotal = Number(subtotal) || 0;
  }
}
module.exports = LineaDevolucion;