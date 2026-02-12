class ExistenciaDTO {
  constructor({ id, fechaE, fechaV, cantidad, productoId, repartoId }) {
      this.id = id;
      this.fechaE = fechaE;
      this.fechaV = fechaV;
      this.cantidad = cantidad;
      this.productoId = productoId;
      this.repartoId = repartoId;
  }
}
module.exports = ExistenciaDTO;