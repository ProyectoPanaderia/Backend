class RemitoFilterDTO {
  /**
   * @param {{ clienteId?: any, repartoId?: any, fechaDesde?: any, fechaHasta?: any, page?: any, pageSize?: any, orderBy?: any, orderDir?: any }} query
   */
  constructor(query = {}) {
    
    // Filtros opcionales
    if (query.clienteId && !isNaN(Number(query.clienteId))) {
      this.clienteId = Number(query.clienteId);
    }

    if (query.repartoId && !isNaN(Number(query.repartoId))) {
      this.repartoId = Number(query.repartoId);
    }

    if (query.fechaDesde && typeof query.fechaDesde === 'string') {
      this.fechaDesde = query.fechaDesde;
    }

    if (query.fechaHasta && typeof query.fechaHasta === 'string') {
      this.fechaHasta = query.fechaHasta;
    }

    // Paginación
    this.page = query.page ? Math.max(1, Number(query.page)) : 1;
    this.pageSize = query.pageSize ? Math.min(100, Math.max(1, Number(query.pageSize))) : 10;
    this.offset = (this.page - 1) * this.pageSize;

    // Ordenamiento
    const validOrder = ['id', 'total', 'fecha', 'clienteId', 'repartoId'];
    this.orderBy = validOrder.includes(query.orderBy) ? query.orderBy : 'fecha';
    this.orderDir = String(query.orderDir || '').toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
  }
}

module.exports = RemitoFilterDTO;