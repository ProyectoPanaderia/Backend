class PrecioProductoFilterDTO {
  constructor(query = {}) {
    const { productoId, nombre, fecha, offset, pageSize, orderBy, orderDir } = query;
    
    if (productoId) this.productoId = Number(productoId);
    if (nombre) this.nombre = nombre;
    if (fecha) this.fecha = fecha;
    
    // Paginación
    this.offset = offset ? Number(offset) : 0;
    this.pageSize = pageSize ? Number(pageSize) : 10;
    
    // Ordenamiento
    this.orderBy = orderBy || 'fecha';
    this.orderDir = orderDir || 'DESC';
  }
}

module.exports = PrecioProductoFilterDTO;