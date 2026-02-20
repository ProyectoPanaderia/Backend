const { LineaDevolucion } = require('../models/models');

class LineaDevolucionRepositorySequelize {
  
  async create(data) {
    return await LineaDevolucion.create(data);
  }
  
  async findAll(filter = {}) {
    const { devolucionId } = filter;
    const where = {};
    
    // Acá aplicamos el filtro por Devolución para no cometer el error del pedido!
    if (devolucionId) {
      where.devolucionId = Number(devolucionId);
    }

    const rows = await LineaDevolucion.findAll({ where }); 
    return {
      data: rows,
      meta: { total: rows.length }
    };
  }

  async findById(id) {
    return await LineaDevolucion.findByPk(id);
  }

  async update(id, data) {
    const linea = await LineaDevolucion.findByPk(id);
    if (!linea) return null;
    return await linea.update(data);
  }

  async delete(id) {
    const linea = await LineaDevolucion.findByPk(id);
    if (!linea) return false;
    await linea.destroy();
    return true;
  }
}

module.exports = LineaDevolucionRepositorySequelize;