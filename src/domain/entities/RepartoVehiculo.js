class RepartoVehiculo {
    constructor(id, repartoId, vehiculoId) {
      if (id == null || repartoId == null || vehiculoIdId == null) {
        throw new Error("Todos los campos son obligatorios");
      }
  
      this.id = id;
      this.repartoId = repartoId;
      this.vehiculoId = vehiculoId;
    }
  }
  
  module.exports = RepartoVehiculo;