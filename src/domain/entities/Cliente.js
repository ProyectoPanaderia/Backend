class Cliente {
    constructor(id, nombre, ciudadId) {
      if (id == null || !nombre || ciudadId == null) {
        throw new Error("Todos los campos son obligatorios");
      }
  
      this.id = id;
      this.nombre = nombre;
      this.ciudadId = ciudadId;
    }
  }
  
  module.exports = Cliente;
  