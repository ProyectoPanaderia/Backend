class Pedido {
  constructor(id, fechaEmision, fechaEntrega, repartoId, clienteId, estado = 'Pendiente', total = 0.00) {
    if (id == null || !fechaEmision || !fechaEntrega || !repartoId || !clienteId) {
      throw new Error("Los campos id, fechaEmision, fechaEntrega, repartoId y clienteId son obligatorios");
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
    this.clienteId = clienteId;
    this.estado = estado;
    this.total = total;
  }
}

module.exports = Pedido;