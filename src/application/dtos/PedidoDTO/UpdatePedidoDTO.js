class UpdatePedidoDTO {
  /**
   * @param {{ fechaEmision?:any, fechaEntrega?:any, repartoId?:any, clienteId?:any, estado?:any }} param0
   */
  constructor({ fechaEmision, fechaEntrega, repartoId, clienteId } = {}) {
    
    if (fechaEmision !== undefined) {
      if (typeof fechaEmision !== 'string' || !fechaEmision.trim()) {
        throw new Error('fechaEmision inválida');
      }
      this.fechaEmision = fechaEmision.trim();
    }

    if (fechaEntrega !== undefined) {
      if (typeof fechaEntrega !== 'string' || !fechaEntrega.trim()) {
        throw new Error('fechaEntrega inválida');
      }
      this.fechaEntrega = fechaEntrega.trim();
    }

    if (repartoId !== undefined) {
      if (repartoId === null || isNaN(repartoId)) { 
         throw new Error('repartoId inválido');
      }
      const rId = Number(repartoId);
      if (rId <= 0) throw new Error('repartoId debe ser > 0');
      this.repartoId = rId;
    }

    if (clienteId !== undefined) {
      if (clienteId === null || isNaN(clienteId)) { 
         throw new Error('clienteId inválido');
      }
      const cId = Number(clienteId);
      if (cId <= 0) throw new Error('clienteId debe ser > 0');
      this.clienteId = cId;
    }

    if (estado !== undefined) {
        this.estado = String(estado).trim();
    }
    
    if (
      this.fechaEmision === undefined && 
      this.fechaEntrega === undefined && 
      this.repartoId === undefined &&
      this.clienteId === undefined &&
      this.estado === undefined
    ) {
      throw new Error('sin cambios');
    }
  }
}

module.exports = UpdatePedidoDTO;