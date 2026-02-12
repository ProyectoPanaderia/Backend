class Existencia {
    constructor(id, fechaE, fechaV, cantidad, productoId, repartoId) {
      if (id == null || !fechaE || !fechaV || cantidad == null || productoId == null || repartoId == null) {
        throw new Error("Todos los campos son obligatorios");
      }
  
      this.id = id;
      this.fechaE = fechaE;
      this.fechaV = fechaV;
      this.cantidad = cantidad;
      this.productoId = productoId;
      this.repartoId = repartoId;
    }
  }
  
  module.exports = Existencia;
  