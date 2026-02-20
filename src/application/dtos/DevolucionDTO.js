class DevolucionDTO {
  constructor({ id, fecha, razon, repartoId, clienteId, total }) {
      this.id = id;
      this.fecha = fecha;
      this.razon = razon;
      this.repartoId = repartoId;
      this.clienteId = clienteId;
      this.total = total;
  }
}
module.exports = DevolucionDTO;