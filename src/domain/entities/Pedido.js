class Pedido {
  constructor(id, fechaEmision, fechaEntrega, repartoId) {
    if (id == null || !fechaEmision || !fechaEntrega || !repartoId) {
      throw new Error("Los campos id, fechaEmision, fechaEntrega y repartoId son obligatorios");
    }

    // Validar que fechaEntrega es posterior a fechaEmision
    const emision = new Date(fechaEmision);
    const entrega = new Date(fechaEntrega);
    
    if (entrega < emision) {
      throw new Error("fechaEntrega debe ser posterior a fechaEmision");
    }

    this.id = id;
    this.fechaEmision = fechaEmision;
    this.fechaEntrega = fechaEntrega;
    this.repartoId = repartoId;
  }
}

module.exports = Pedido;