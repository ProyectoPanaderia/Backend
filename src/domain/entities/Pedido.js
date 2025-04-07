class Pedido {
  constructor(id, fechaEmision, fechaEntrega, repartoId) {
    if (id == null || !fechaEmision || !fechaEntrega || repartoId == null) {
      throw new Error("Todos los campos son obligatorios");
    }

    this.id = id;
    this.fechaEmision = fechaEmision;
    this.fechaEntrega = fechaEntrega;
    this.repartoId = repartoId;
  }
}

module.exports = Pedido;
