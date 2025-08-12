class RemitoDTO {
  constructor({ id, total, fecha, clienteId, repartoId }) {
      this.id = id;
      this.total = total;
      this.fecha = fecha;
      this.clienteId = clienteId;
      this.repartoId = repartoId;
  }
}
module.exports = RemitoDTO;