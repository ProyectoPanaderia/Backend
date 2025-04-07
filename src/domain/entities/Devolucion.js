class Devolucion {
    constructor(id, fecha, razon, repartoId) {
      if (id == null || !fecha || !razon || repartoId == null) {
        throw new Error("Todos los campos son obligatorios");
      }
  
      this.id = id;
      this.fecha = fecha;
      this.razon = razon;
      this.repartoId = repartoId;

    }
  }
  
  module.exports = Devolucion;