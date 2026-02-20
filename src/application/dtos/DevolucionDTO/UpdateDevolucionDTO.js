class UpdateDevolucionDTO {
  /**
   * @param {{ fecha?:any, razon?:any, repartoId?:any, clienteId?:any }} param0
   */
  constructor({ fecha, razon, repartoId, clienteId } = {}) {
    
    if (fecha !== undefined) {
      if (fecha === null || String(fecha).trim() === '') throw new Error('La fecha es obligatoria');
      this.fecha = String(fecha).trim();
    }

    if (razon !== undefined) {
      if (razon === null || String(razon).trim() === '') throw new Error('La razón no puede estar vacía');
      this.razon = String(razon).trim();
    }

    if (repartoId !== undefined) {
      const rId = Number(repartoId);
      if (isNaN(rId) || rId <= 0) throw new Error('El reparto seleccionado es inválido');
      this.repartoId = rId;
    }

    if (clienteId !== undefined) {
      const cId = Number(clienteId);
      if (isNaN(cId) || cId <= 0) throw new Error('El cliente seleccionado es inválido');
      this.clienteId = cId;
    }

    if (
      this.fecha === undefined && 
      this.razon === undefined && 
      this.repartoId === undefined &&
      this.clienteId === undefined
    ) {
      throw new Error('No se enviaron datos para actualizar la devolución');
    }
  }
}
module.exports = UpdateDevolucionDTO;