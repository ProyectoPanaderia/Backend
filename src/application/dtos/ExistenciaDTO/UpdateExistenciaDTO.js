class UpdateExistenciaDTO {
  /**
   * @param {{ repartoId?: any, cantidad?: any, fechaE?: any, fechaV?: any }} param0
   */
  constructor({ repartoId, cantidad, fechaE, fechaV } = {}) {
    
    if (repartoId !== undefined) {
      if (isNaN(Number(repartoId))) {
        throw new Error('repartoId debe ser numérico');
      }
      this.repartoId = Number(repartoId);
    }

    if (cantidad !== undefined) {
      const cant = Number(cantidad);
      if (isNaN(cant) || cant < 0) {
        throw new Error('cantidad inválida');
      }
      this.cantidad = cant;
    }

    if (fechaE !== undefined) {
      if (typeof fechaE !== 'string' || !fechaE.trim()) {
        throw new Error('fechaElaboracion inválida');
      }
      this.fechaE = fechaE;
    }

    if (fechaV !== undefined) {
      if (typeof fechaV !== 'string' || !fechaV.trim()) {
        throw new Error('fechaVencimiento inválida');
      }
      this.fechaV = fechaV;
    }

    if (
      this.repartoId === undefined &&
      this.cantidad === undefined &&
      this.fechaE === undefined &&
      this.fechaV === undefined
    ) {
      throw new Error('sin cambios para actualizar');
    }
  }
}

module.exports = UpdateExistenciaDTO;