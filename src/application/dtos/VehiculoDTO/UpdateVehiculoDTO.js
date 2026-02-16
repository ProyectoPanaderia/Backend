class UpdateVehiculoDTO {
  /**
   * @param {{ patente?: any, modelo?: any, capacidad?: any, repartoId?: any }} param0
   */
  constructor({ patente, modelo, capacidad, repartoId } = {}) {
    
    if (patente !== undefined && (!patente || typeof patente !== 'string' || !patente.trim())) {
      throw new Error('patente debe ser un texto válido');
    }

    if (modelo !== undefined && (!modelo || typeof modelo !== 'string' || !modelo.trim())) {
      throw new Error('modelo debe ser un texto válido');
    }

    if (capacidad !== undefined && (isNaN(Number(capacidad)) || Number(capacidad) <= 0)) {
      throw new Error('capacidad debe ser un número mayor a 0');
    }

    if (repartoId !== undefined && isNaN(Number(repartoId))) {
      throw new Error('repartoId debe ser numérico');
    }

    if (patente !== undefined) this.patente = patente.trim().toUpperCase();
    if (modelo !== undefined) this.modelo = modelo.trim();
    if (capacidad !== undefined) this.capacidad = Number(capacidad);
    if (repartoId !== undefined) this.repartoId = Number(repartoId);

    if (
      this.patente === undefined &&
      this.modelo === undefined &&
      this.capacidad === undefined &&
      this.repartoId === undefined
    ) {
      throw new Error('sin cambios para actualizar');
    }
  }
}

module.exports = UpdateVehiculoDTO;