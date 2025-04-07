class RepartoEmpleado {
    constructor(id, repartoId, empleadoId) {
      if (id == null || repartoId == null || empleadoId == null) {
        throw new Error("Todos los campos son obligatorios");
      }
  
      this.id = id;
      this.repartoId = repartoId;
      this.empleadoId = empleadoId;
    }
  }
  
  module.exports = RepartoEmpleado;