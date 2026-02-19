class EmpleadoDTO {
  constructor({ id, nombre, repartoId, usuarioId } = {}) {
    this.id = id;
    this.nombre = nombre;
    this.repartoId = repartoId;
    this.usuarioId = usuarioId;
  }
}
module.exports = EmpleadoDTO;