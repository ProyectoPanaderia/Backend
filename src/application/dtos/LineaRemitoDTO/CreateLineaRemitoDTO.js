class CreateLineaRemitoDTO {
  /**
   * @param {{ cantidad: any, subtotal: any, remitoId: any, existenciaId: any }} param0
   */
  constructor({ cantidad, subtotal, remitoId, existenciaId }) {
    
    // Validar cantidad
    if (cantidad === undefined || cantidad === null || isNaN(Number(cantidad)) || Number(cantidad) <= 0) {
      throw new Error('cantidad requerida y debe ser mayor a 0');
    }

    // Validar subtotal
    if (subtotal === undefined || subtotal === null || isNaN(Number(subtotal)) || Number(subtotal) < 0) {
      throw new Error('subtotal requerido y debe ser mayor o igual a 0');
    }

    // Validar remitoId
    if (!remitoId || isNaN(Number(remitoId))) {
      throw new Error('remitoId requerido y debe ser numérico');
    }

    // Validar existenciaId
    if (!existenciaId || isNaN(Number(existenciaId))) {
      throw new Error('existenciaId requerido y debe ser numérico');
    }

    this.cantidad = Number(cantidad);
    this.subtotal = Number(subtotal);
    this.remitoId = Number(remitoId);
    this.existenciaId = Number(existenciaId);
  }
}

module.exports = CreateLineaRemitoDTO;