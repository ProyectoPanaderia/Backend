const { Existencia, Producto, Reparto } = require('../models/models.js'); // Asegurate que la ruta sea correcta
const { Op } = require('sequelize');
const ExistenciaRepository = require('../../../domain/repositories/existenciaRepository');

class ExistenciaRepositorySequelize extends ExistenciaRepository {
  
  async create(data) {
    // data.fechaE ya viene como string "YYYY-MM-DD" del DTO
    const nueva = await Existencia.create(data);
    return await nueva.reload({ include: [Producto, Reparto] });
  }

  async findAll(filter = {}) {
    const { productoId, repartoId, fechaV, fechaE } = filter;
    
    const whereClause = {};

    // Filtros por ID
    if (productoId) whereClause.productoId = Number(productoId);
    if (repartoId) whereClause.repartoId = Number(repartoId);
  
    if (fechaV) {
      whereClause.fechaV = fechaV; 
    }

    if (fechaE) {
      whereClause.fechaE = fechaE;
    }

    const rows = await Existencia.findAll({
      where: whereClause,
      include: [
        { model: Producto }, 
        { model: Reparto }
      ],
      order: [['id', 'DESC']]
    });

    return {
      data: rows,
      meta: { total: rows.length }
    };
  }

  async findById(id) {
    return await Existencia.findByPk(id, {
      include: [Producto, Reparto]
    });
  }

  async update(id, data) {
    const existencia = await Existencia.findByPk(id);
    if (!existencia) return null;
    
    await existencia.update(data);
    return await existencia.reload({ include: [Producto, Reparto] });
  }

  async delete(id) {
    const existencia = await Existencia.findByPk(id);
    if (!existencia) return false;
    await existencia.destroy();
    return true;
  }
}

module.exports = ExistenciaRepositorySequelize;