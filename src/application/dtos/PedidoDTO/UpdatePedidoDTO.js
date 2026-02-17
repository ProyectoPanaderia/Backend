class UpdatePedidoDTO {
  /**
   * @param {{ fechaEmision?:any, fechaEntrega?:any, repartoId?:any, clienteId?:any, estado?:any }} param0
   */
  constructor({ fechaEmision, fechaEntrega, repartoId, clienteId, estado } = {}) {
    
    // Validamos Fecha Emisión (aceptamos string, ignoramos nulos si no los mandan)
    if (fechaEmision !== undefined) {
      if (fechaEmision === null || String(fechaEmision).trim() === '') {
        throw new Error('La fecha de emisión es obligatoria');
      }
      this.fechaEmision = String(fechaEmision).trim();
    }

    if (fechaEntrega !== undefined) {
      if (fechaEntrega === null || String(fechaEntrega).trim() === '') {
        throw new Error('La fecha de entrega es obligatoria');
      }
      this.fechaEntrega = String(fechaEntrega).trim();
    }

    if (repartoId !== undefined) {
      const rId = Number(repartoId);
      if (isNaN(rId) || rId <= 0) {
        throw new Error('El reparto seleccionado es inválido');
      }
      this.repartoId = rId;
    }

    if (clienteId !== undefined) {
      const cId = Number(clienteId);
      if (isNaN(cId) || cId <= 0) {
        throw new Error('El cliente seleccionado es inválido');
      }
      this.clienteId = cId;
    }

    if (estado !== undefined) {
      if (estado === null || String(estado).trim() === '') {
        throw new Error('El estado no puede estar vacío');
      }
      this.estado = String(estado).trim();
    }

    if (
      this.fechaEmision === undefined && 
      this.fechaEntrega === undefined && 
      this.repartoId === undefined &&
      this.clienteId === undefined &&
      this.estado === undefined
    ) {
      throw new Error('No se enviaron datos para actualizar el pedido');
    }
  }
}

module.exports = UpdatePedidoDTO;