const { PrecioProducto, Producto } = require('../models/models.js');
const { Op } = require('sequelize');
const PrecioProductoRepository = require('../../../domain/repositories/precioProductoRepository.js');

class PrecioProductoRepositorySequelize extends PrecioProductoRepository {
  
  async create(data) {
    const nuevo = await PrecioProducto.create(data);
    return await nuevo.reload({ include: [Producto] });
  }

  async findAll(filter = {}) {
    const { productoId, nombre, fecha, offset, pageSize, orderBy, orderDir } = filter;
    
    const whereClause = {};
    
    // Filtros
    if (productoId) whereClause.productoId = Number(productoId);
    if (nombre) whereClause.nombre = nombre;
    if (fecha) {
      const inicio = new Date(fecha);
      const fin = new Date(fecha);
      fin.setHours(23, 59, 59, 999);
      whereClause.fecha = { [Op.between]: [inicio, fin] };
    }
    
    const rows = await PrecioProducto.findAll({
      where: whereClause,
      include: [{ model: Producto }],
      order: [[orderBy || 'fecha', orderDir || 'DESC']],
      offset: offset || 0,
      limit: pageSize || 10
    });
    
    const total = await PrecioProducto.count({ where: whereClause });
    
    return {
      data: rows,
      meta: {
        total,
        page: Math.floor((offset || 0) / (pageSize || 10)) + 1,
        pageSize: pageSize || 10
      }
    };
  }

  async findById(id) {
    return await PrecioProducto.findByPk(id, {
      include: [Producto]
    });
  }

  /**
   * Encuentra el precio vigente para un producto en una fecha específica
   * @param {number} productoId 
   * @param {Date|string} fecha - Fecha para la cual buscar el precio
   * @param {string} nombre - Tipo de precio ('reventa' o 'consumidor final')
   * @returns {PrecioProducto|null}
   */
  async findVigenteByProducto(productoId, fecha, nombre) {
    return await PrecioProducto.findOne({
      where: {
        productoId: Number(productoId),
        nombre: nombre,
        fecha: { [Op.lte]: fecha }
      },
      include: [Producto],
      order: [['fecha', 'DESC']],
      limit: 1
    });
  }

  async update(id, data) {
    const precio = await PrecioProducto.findByPk(id);
    if (!precio) return null;
    
    await precio.update(data);
    return await precio.reload({ include: [Producto] });
  }

  async delete(id) {
    const precio = await PrecioProducto.findByPk(id);
    if (!precio) return false;
    
    await precio.destroy();
    return true;
  }
}

module.exports = PrecioProductoRepositorySequelize;