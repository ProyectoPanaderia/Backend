class UpdatePedidoDTO {
  /**
   * @param {{ fechaEmision?:any, fechaEntrega?:any, repartoId?:any }} param0
   */
  constructor({ fechaEmision, fechaEntrega, repartoId } = {}) {
    
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
    
    if (
      this.fechaEmision === undefined && 
      this.fechaEntrega === undefined && 
      this.repartoId === undefined
    ) {
      throw new Error('sin cambios');
    }
  }
}

module.exports = UpdatePedidoDTO;