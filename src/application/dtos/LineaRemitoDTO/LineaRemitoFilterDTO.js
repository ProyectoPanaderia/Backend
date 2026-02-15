class LineaRemitoFilterDTO {
  /**
   * @param {{ remitoId?: any, existenciaId?: any, page?: any, pageSize?: any, orderBy?: any, orderDir?: any }} query
   */
  constructor(query = {}) {
    
    // Filtros opcionales
    if (query.remitoId && !isNaN(Number(query.remitoId))) {
      this.remitoId = Number(query.remitoId);
    }

    if (query.existenciaId && !isNaN(Number(query.existenciaId))) {
      this.existenciaId = Number(query.existenciaId);
    }

    // Paginación
    this.page = query.page ? Math.max(1, Number(query.page)) : 1;
    this.pageSize = query.pageSize ? Math.min(100, Math.max(1, Number(query.pageSize))) : 10;
    this.offset = (this.page - 1) * this.pageSize;

    // Ordenamiento
    const validOrder = ['id', 'cantidad', 'subtotal', 'remitoId', 'existenciaId'];
    this.orderBy = validOrder.includes(query.orderBy) ? query.orderBy : 'id';
    this.orderDir = String(query.orderDir || '').toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
  }
}

module.exports = LineaRemitoFilterDTO;