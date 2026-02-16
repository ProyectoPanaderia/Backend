class CreateVehiculoDTO {
  /**
   * @param {{ patente: any, modelo: any, capacidad: any, repartoId: any }} param0
   */
  constructor({ patente, modelo, capacidad, repartoId }) {
    
    if (!patente || typeof patente !== 'string' || !patente.trim()) {
      throw new Error('patente requerida y debe ser un texto válido');
    }

    if (!modelo || typeof modelo !== 'string' || !modelo.trim()) {
      throw new Error('modelo requerido y debe ser un texto válido');
    }

    if (capacidad === undefined || capacidad === null || isNaN(Number(capacidad)) || Number(capacidad) <= 0) {
      throw new Error('capacidad requerida y debe ser un número mayor a 0');
    }

    if (!repartoId || isNaN(Number(repartoId))) {
      throw new Error('repartoId requerido y debe ser numérico');
    }

    this.patente = patente.trim().toUpperCase();
    this.modelo = modelo.trim();
    this.capacidad = Number(capacidad);
    this.repartoId = Number(repartoId);
  }
}

module.exports = CreateVehiculoDTO;