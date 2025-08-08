class Vehiculo {
    constructor(id, matricula) {
      if (id == null || !matricula ) {
        throw new Error("Todos los campos son obligatorios");
      }
  
      this.id = id;
      this.matricula = matricula;
    }
  }
  
  module.exports = Vehiculo;