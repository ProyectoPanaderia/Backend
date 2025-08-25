class ProductoFilterDTO {
  /**
   * @param {{ q?:any, minPeso?:any, maxPeso?:any, page?:any, pageSize?:any, orderBy?:any, orderDir?:any }} q
   */
  constructor(q = {}) {
    const { q: text, minPeso, maxPeso, page = 1, pageSize = 20, orderBy = 'nombre', orderDir = 'ASC' } = q;

    this.q = text ? String(text).trim() : '';
    this.minPeso = minPeso != null ? Number(minPeso) : undefined;
    this.maxPeso = maxPeso != null ? Number(maxPeso) : undefined;
    this.page = Math.max(1, Number(page));
    this.pageSize = Math.min(100, Math.max(1, Number(pageSize)));

    const validOrder = ['id', 'nombre', 'peso'];
    this.orderBy = validOrder.includes(orderBy) ? orderBy : 'nombre';
    this.orderDir = String(orderDir).toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
  }
}
module.exports = ProductoFilterDTO;