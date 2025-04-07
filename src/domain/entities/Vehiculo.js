class Vehiculo {
    constructor(id, patente, repartoVehiculoId) {
      if (id == null || !patente || repartoVehiculoId == null) {
        throw new Error("Todos los campos son obligatorios");
      }
  
      this.id = id;
      this.patente = patente;
      this.repartoVehiculoId = repartoVehiculoId;
    }
  }
  
  module.exports = Vehiculo;