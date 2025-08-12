class DevolucionDTO {
  constructor({ id, fecha, razon, repartoId }) {
      this.id = id;
      this.fecha = fecha;
      this.razon = razon;
      this.repartoId = repartoId;
  }
}
module.exports = DevolucionDTO;