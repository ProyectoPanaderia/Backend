class Empleado {
  constructor(id, nombre, cargo, repartoEmpleadoId) {
    if (id == null || !nombre || !cargo || repartoEmpleadoId == null) {
      throw new Error("Todos los campos son obligatorios");
    }

    this.id = id;
    this.nombre = nombre;
    this.cargo = cargo;
    this.repartoEmpleadoId = repartoEmpleadoId;
  }
}

module.exports = Empleado;