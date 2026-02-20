class Devolucion {
  constructor(id, fecha, razon, repartoId, clienteId, total) {
    if (id == null || !fecha || !razon || repartoId == null || clienteId == null) {
      throw new Error("Faltan campos obligatorios en Devolucion");
    }

    this.id = id;
    this.fecha = fecha;
    this.razon = razon;
    this.repartoId = repartoId;
    this.clienteId = clienteId;
    this.total = Number(total) || 0;
  }
}
module.exports = Devolucion;