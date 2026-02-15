class UpdateLineaRemitoDTO {
  /**
   * @param {{ cantidad?: any, subtotal?: any, existenciaId?: any }} param0
   */
  constructor({ cantidad, subtotal, existenciaId } = {}) {
    
    // cantidad es opcional en actualizaciones
    if (cantidad !== undefined && (isNaN(Number(cantidad)) || Number(cantidad) <= 0)) {
      throw new Error('cantidad debe ser un número mayor a 0');
    }

    // subtotal es opcional en actualizaciones
    if (subtotal !== undefined && (isNaN(Number(subtotal)) || Number(subtotal) < 0)) {
      throw new Error('subtotal debe ser un número mayor o igual a 0');
    }

    // existenciaId es opcional en actualizaciones
    if (existenciaId !== undefined && isNaN(Number(existenciaId))) {
      throw new Error('existenciaId debe ser numérico');
    }

    if (cantidad !== undefined) this.cantidad = Number(cantidad);
    if (subtotal !== undefined) this.subtotal = Number(subtotal);
    if (existenciaId !== undefined) this.existenciaId = Number(existenciaId);

    // Verificar que al menos un campo fue actualizado
    if (
      this.cantidad === undefined &&
      this.subtotal === undefined &&
      this.existenciaId === undefined
    ) {
      throw new Error('sin cambios para actualizar');
    }
  }
}

module.exports = UpdateLineaRemitoDTO;