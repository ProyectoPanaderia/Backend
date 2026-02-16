class EmpleadoFilterDTO {
  /**
   * @param {{ nombre?: any, repartoId?: any, page?: any, pageSize?: any, orderBy?: any, orderDir?: any }} query
   */
  constructor(query = {}) {
    
    if (query.nombre && typeof query.nombre === 'string') {
      this.nombre = query.nombre.trim();
    }

    if (query.repartoId && !isNaN(Number(query.repartoId))) {
      this.repartoId = Number(query.repartoId);
    }

    this.page = query.page ? Math.max(1, Number(query.page)) : 1;
    this.pageSize = query.pageSize ? Math.min(100, Math.max(1, Number(query.pageSize))) : 10;
    this.offset = (this.page - 1) * this.pageSize;

    const validOrder = ['id', 'nombre', 'apellido', 'email', 'repartoId'];
    this.orderBy = validOrder.includes(query.orderBy) ? query.orderBy : 'nombre';
    this.orderDir = String(query.orderDir || '').toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
  }
}

module.exports = EmpleadoFilterDTO;