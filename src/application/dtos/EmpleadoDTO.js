class EmpleadoDTO {
  constructor({ id, nombre, cargo, repartoEmpleadoId }) {
    this.id = id;
    this.nombre = nombre;
    this.cargo = cargo;
    this.repartoEmpleadoId = repartoEmpleadoId;
  }
}
module.exports = EmpleadoDTO;