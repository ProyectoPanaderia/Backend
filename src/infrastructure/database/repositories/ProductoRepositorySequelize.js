const { Producto } = require('../models/models');
const ProductoRepository = require('../../../domain/repositories/productoRepository');

class ProductoRepositorySequelize extends ProductoRepository {
  async create(data) {
    return await Producto.create(data);
  }
  
  async findAll() {
    return await Producto.findAll();
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