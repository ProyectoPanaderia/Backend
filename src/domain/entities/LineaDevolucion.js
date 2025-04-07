class LineaDevolucion {
  constructor(id, cantidad, existenciaId, devolucionId) {
    if (id == null || cantidad == null || existenciaId == null || devolucionId == null) {
      throw new Error("Todos los campos son obligatorios");
    }

    this.id = id;
    this.cantidad = cantidad;
    this.existenciaId = existenciaId;
    this.devolucionId = devolucionId;
  }
}

module.exports = LineaDevolucion;
