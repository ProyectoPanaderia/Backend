class Ciudad {
    constructor(id, nombre) {
      if (id == null || !nombre) {
        throw new Error("Todos los campos son obligatorios");
      }
  
      this.id = id;
      this.nombre = nombre;
    }
  }
  
  module.exports = Ciudad;