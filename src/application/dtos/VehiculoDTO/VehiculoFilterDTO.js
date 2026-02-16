class VehiculoFilterDTO {
  /**
   * @param {{ patente?: any, repartoId?: any, page?: any, pageSize?: any, orderBy?: any, orderDir?: any }} query
   */
  constructor(query = {}) {
    
    if (query.patente && typeof query.patente === 'string') {
      this.patente = query.patente.trim().toUpperCase();
    }

    if (query.repartoId && !isNaN(Number(query.repartoId))) {
      this.repartoId = Number(query.repartoId);
    }

    this.page = query.page ? Math.max(1, Number(query.page)) : 1;
    this.pageSize = query.pageSize ? Math.min(100, Math.max(1, Number(query.pageSize))) : 10;
    this.offset = (this.page - 1) * this.pageSize;

    const validOrder = ['id', 'patente', 'modelo', 'capacidad', 'repartoId'];
    this.orderBy = validOrder.includes(query.orderBy) ? query.orderBy : 'patente';
    this.orderDir = String(query.orderDir || '').toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
  }
}

module.exports = VehiculoFilterDTO;