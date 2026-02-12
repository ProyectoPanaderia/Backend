class ExistenciaFilterDTO {
  /**
   * @param {{ productoId?: any, repartoId?: any, page?: any, pageSize?: any, orderBy?: any, orderDir?: any }} q
   */
  constructor(q = {}) {
    const {
      productoId,
      repartoId,
      page = 1,
      pageSize = 20,
      orderBy = 'id',
      orderDir = 'DESC', // Por defecto mostramos lo último creado primero
    } = q;

    // Filtros específicos
    this.productoId = productoId ? Number(productoId) : undefined;
    this.repartoId = repartoId ? Number(repartoId) : undefined;

    // Paginación
    this.page = Math.max(1, Number(page));
    this.pageSize = Math.min(100, Math.max(1, Number(pageSize)));

    // Ordenamiento
    const validOrder = ['id', 'cantidad', 'fechaE', 'fechaV'];
    this.orderBy = validOrder.includes(orderBy) ? orderBy : 'id';
    this.orderDir = String(orderDir).toUpperCase() === 'ASC' ? 'ASC' : 'DESC';
  }
}

module.exports = ExistenciaFilterDTO;