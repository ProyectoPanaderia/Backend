class CiudadFilterDTO {
  /**
   * @param {{ q?:any, page?:any, pageSize?:any, orderBy?:any, orderDir?:any }} q
   */
  constructor(q = {}) {
    const {
      q: text,
      page = 1,
      pageSize = 20,
      orderBy = 'nombre',
      orderDir = 'ASC'
    } = q;

    this.q = text ? String(text).trim() : '';
    this.page = Math.max(1, Number(page));
    this.pageSize = Math.min(100, Math.max(1, Number(pageSize)));

    const validOrder = ['id', 'nombre'];
    this.orderBy = validOrder.includes(orderBy) ? orderBy : 'nombre';
    this.orderDir = String(orderDir).toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
  }
}

module.exports = CiudadFilterDTO;