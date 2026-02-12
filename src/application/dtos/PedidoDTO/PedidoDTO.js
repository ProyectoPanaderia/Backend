class PedidoDTO {
  constructor({ id, fechaEmision, fechaEntrega, repartoId }) {
    this.id = id;
    this.fechaEmision = fechaEmision;
    this.fechaEntrega = fechaEntrega;
    this.repartoId = repartoId;
  }
}
module.exports = PedidoDTO;