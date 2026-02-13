class Pedido {
  constructor(id, fechaEmision, fechaEntrega, repartoId, clienteId, estado, lineas = []) {
    if (id == null || !fechaEmision || !fechaEntrega || repartoId == null || clienteId == null) {
      throw new Error("Todos los campos son obligatorios");
    }

    this.id = id;
    this.fechaEmision = fechaEmision;
    this.fechaEntrega = fechaEntrega;
    this.repartoId = repartoId;
    this.clienteId = clienteId;
    this.total = total !== undefined ? Number(total) : 0;
    this.estado = estado || 'Pendiente';
    // Que el dominio sepa que tiene hijos
    this.lineas = Array.isArray(lineas) ? lineas : [];
  }
}

module.exports = Pedido;
