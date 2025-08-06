class Reparto {
  constructor(id, tercearizado, nombre, estado, repartoempleadoId, repartoVehiculoId) {
    if (id == null || tercearizado == null || !nombre || estado == null || repartoempleadoId == null || repartoVehiculoId == null) {
      throw new Error("Todos los campos son obligatorios");
    }

    this.id = id;
    this.tercearizado = tercearizado;
    this.nombre = nombre;
    this.estado = estado;
    this.repartoempleadoId = repartoempleadoId;
    this.repartoVehiculoId = repartoVehiculoId;
  }
}

module.exports = Reparto;