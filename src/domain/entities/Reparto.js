class Reparto {
  constructor(id, tercerizado, nombre, estado, repartoempleadoId, repartoVehiculoId) {
    if (id == null || tercerizado == null || !nombre || estado == null || repartoempleadoId == null || repartoVehiculoId == null) {
      throw new Error("Todos los campos son obligatorios");
    }

    this.id = id;
    this.tercerizado = tercerizado;
    this.nombre = nombre;
    this.estado = estado;
    this.repartoempleadoId = repartoempleadoId;
    this.repartoVehiculoId = repartoVehiculoId;
  }
}

module.exports = Reparto;