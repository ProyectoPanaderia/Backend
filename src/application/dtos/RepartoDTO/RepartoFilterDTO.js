class RepartoFilterDTO {
  /**
   * @param {{ q?: any, tercerizado?: any, estado?: any, page?: any, pageSize?: any, orderBy?: any, orderDir?: any }} q
   */
  constructor(q = {}) {
    const {
      q: text,
      tercerizado,
      estado,
      page = 1,
      pageSize = 20,
      orderBy = 'nombre',
      orderDir = 'ASC',
    } = q;

    //Filtros básicos
    this.q = text ? String(text).trim() : '';
    this.tercerizado = tercerizado
      ? String(tercerizado).toUpperCase().trim()
      : undefined;
    this.estado = estado
      ? String(estado).toUpperCase().trim()
      : undefined;

    //Paginación
    this.page = Math.max(1, Number(page));
    this.pageSize = Math.min(100, Math.max(1, Number(pageSize)));

    //Ordenamiento
    const validOrder = ['id', 'nombre', 'tercerizado', 'estado'];
    this.orderBy = validOrder.includes(orderBy) ? orderBy : 'nombre';
    this.orderDir =
      String(orderDir).toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
  }
}

module.exports = RepartoFilterDTO;