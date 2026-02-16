class CreateDevolucionDTO {
  /**
   * @param {{ fecha: any, razon: any, repartoId: any }} param0
   */
  constructor({ fecha, razon, repartoId }) {
    
    // Validar fecha
    if (!fecha || typeof fecha !== 'string') {
      throw new Error('fecha requerida y debe ser válida (YYYY-MM-DD)');
    }

    // Validar razon
    if (!razon || typeof razon !== 'string' || !razon.trim()) {
      throw new Error('razon requerida y debe ser un texto válido');
    }

    // Validar repartoId
    if (!repartoId || isNaN(Number(repartoId))) {
      throw new Error('repartoId requerido y debe ser numérico');
    }

    this.fecha = fecha;
    this.razon = razon.trim();
    this.repartoId = Number(repartoId);
  }
}

module.exports = CreateDevolucionDTO;