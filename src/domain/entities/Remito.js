class Remito {
    constructor(id, total, fecha, clienteId, repartoId) {
      if (id == null || total == null || !fecha || repartoId == null) {
        throw new Error("Todos los campos son obligatorios");
      }
  
      this.id = id;
      this.total = total;
      this.fecha = fecha;
      this.clienteId = clienteId;
      this.repartoId = repartoId;
    }
  }
  
  module.exports = Remito;