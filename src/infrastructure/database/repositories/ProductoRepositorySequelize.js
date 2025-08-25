const { Producto } = require('../models/models.js');
const ProductoRepository = require('../../../domain/repositories/productoRepository');

class ProductoRepositorySequelize extends ProductoRepository {
  async create(data) {
    return await Producto.create(data);
  }
  
  async findAll(filter) {
    const rows = await Producto.findAll(); // ✅ usar el import directo
    return {
      data: rows,
      meta: { total: rows.length }
    };
  }

  async findById(id) {
    return await Producto.findByPk(id);
  }

  async update(id, data) {
    const producto = await Producto.findByPk(id);
    if (!producto) return null;
    return await producto.update(data);
  }

  async delete(id) {
    const producto = await Producto.findByPk(id);
    if (!producto) return false;
    await producto.destroy();
    return true;
  }
}

module.exports = ProductoRepositorySequelize;
