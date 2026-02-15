class UpdateRemitoDTO {
  /**
   * @param {{ total?: any, fecha?: any, clienteId?: any, repartoId?: any }} param0
   */
  constructor({ total, fecha, clienteId, repartoId } = {}) {
    
    // total es opcional en actualizaciones
    if (total !== undefined && (isNaN(Number(total)) || Number(total) < 0)) {
      throw new Error('total debe ser un número mayor o igual a 0');
    }

    // fecha es opcional en actualizaciones
    if (fecha !== undefined && (!fecha || typeof fecha !== 'string')) {
      throw new Error('fecha debe ser válida (YYYY-MM-DD)');
    }

    // clienteId es opcional
    if (clienteId !== undefined && clienteId !== null && isNaN(Number(clienteId))) {
      throw new Error('clienteId debe ser numérico');
    }

    // repartoId es opcional en actualizaciones
    if (repartoId !== undefined && isNaN(Number(repartoId))) {
      throw new Error('repartoId debe ser numérico');
    }

    if (total !== undefined) this.total = Number(total);
    if (fecha !== undefined) this.fecha = fecha;
    if (clienteId !== undefined) this.clienteId = clienteId ? Number(clienteId) : null;
    if (repartoId !== undefined) this.repartoId = Number(repartoId);

    // Verificar que al menos un campo fue actualizado
    if (
      this.total === undefined &&
      this.fecha === undefined &&
      this.clienteId === undefined &&
      this.repartoId === undefined
    ) {
      throw new Error('sin cambios para actualizar');
    }
  }
}

module.exports = UpdateRemitoDTO;