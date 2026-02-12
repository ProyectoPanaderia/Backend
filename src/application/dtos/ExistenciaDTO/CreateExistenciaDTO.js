class CreateExistenciaDTO {
  /**
   * @param {{ productoId: any, repartoId: any, cantidad: any, fechaE: any, fechaV: any }} param0
   */
  constructor({ productoId, repartoId, cantidad, fechaE, fechaV }) {
    
    // Validar IDs numéricos
    if (!productoId || isNaN(Number(productoId))) {
      throw new Error('productoId requerido y debe ser numérico');
    }

    if (!repartoId || isNaN(Number(repartoId))) {
      throw new Error('repartoId requerido y debe ser numérico');
    }

    // Validar Cantidad
    if (cantidad === undefined || isNaN(Number(cantidad)) || Number(cantidad) < 0) {
      throw new Error('cantidad requerida y debe ser mayor o igual a 0');
    }

    // Validar Fechas (simple check de string no vacío)
    if (!fechaE || typeof fechaE !== 'string') {
      throw new Error('fechaElaboracion requerida');
    }

    if (!fechaV || typeof fechaV !== 'string') {
      throw new Error('fechaVencimiento requerida');
    }

    this.productoId = Number(productoId);
    this.repartoId = Number(repartoId);
    this.cantidad = Number(cantidad);
    // Asumimos que vienen en formato YYYY-MM-DD o ISO
    this.fechaE = fechaE; 
    this.fechaV = fechaV;
  }
}

module.exports = CreateExistenciaDTO;