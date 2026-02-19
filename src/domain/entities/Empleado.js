class Empleado {
  constructor(id, nombre, cargo, repartoId, usuarioId) {
    if (id == null || !nombre || repartoId == null || usuarioId == null) {
      throw new Error("Todos los campos son obligatorios");
    }

    this.id = id;
    this.nombre = nombre;
    this.repartoId = repartoId;
    this.usuarioId = usuarioId;
  }
}

module.exports = Empleado;