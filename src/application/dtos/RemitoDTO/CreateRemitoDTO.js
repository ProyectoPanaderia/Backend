class CreateRemitoDTO {
  /**
   * @param {{ total: any, fecha: any, clienteId?: any, repartoId: any }} param0
   */
  constructor({ total, fecha, clienteId, repartoId }) {
    
    // Validar total
    if (total === undefined || total === null || isNaN(Number(total)) || Number(total) < 0) {
      throw new Error('total requerido y debe ser un número mayor o igual a 0');
    }

    // Validar fecha
    if (!fecha || typeof fecha !== 'string') {
      throw new Error('fecha requerida y debe ser válida (YYYY-MM-DD)');
    }

    // Validar repartoId
    if (!repartoId || isNaN(Number(repartoId))) {
      throw new Error('repartoId requerido y debe ser numérico');
    }

    // clienteId es opcional
    if (clienteId && isNaN(Number(clienteId))) {
      throw new Error('clienteId debe ser numérico si se proporciona');
    }

    this.total = Number(total);
    this.fecha = fecha;
    this.clienteId = clienteId ? Number(clienteId) : null;
    this.repartoId = Number(repartoId);
  }
}

module.exports = CreateRemitoDTO;