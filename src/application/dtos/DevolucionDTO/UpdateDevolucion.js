class UpdateDevolucionDTO {
  /**
   * @param {{ fecha?: any, razon?: any, repartoId?: any }} param0
   */
  constructor({ fecha, razon, repartoId } = {}) {
    
    // fecha es opcional en actualizaciones
    if (fecha !== undefined && (!fecha || typeof fecha !== 'string')) {
      throw new Error('fecha debe ser válida (YYYY-MM-DD)');
    }

    // razon es opcional en actualizaciones
    if (razon !== undefined && (!razon || typeof razon !== 'string' || !razon.trim())) {
      throw new Error('razon debe ser un texto válido');
    }

    // repartoId es opcional en actualizaciones
    if (repartoId !== undefined && isNaN(Number(repartoId))) {
      throw new Error('repartoId debe ser numérico');
    }

    if (fecha !== undefined) this.fecha = fecha;
    if (razon !== undefined) this.razon = razon.trim();
    if (repartoId !== undefined) this.repartoId = Number(repartoId);

    // Verificar que al menos un campo fue actualizado
    if (
      this.fecha === undefined &&
      this.razon === undefined &&
      this.repartoId === undefined
    ) {
      throw new Error('sin cambios para actualizar');
    }
  }
}

module.exports = UpdateDevolucionDTO;