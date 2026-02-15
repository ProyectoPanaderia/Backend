const { LineaRemito, Remito, Existencia, Producto } = require('../models/models.js');
const { Op } = require('sequelize');
const LineaRemitoRepository = require('../../../domain/repositories/lineaRemitoRepository');

class LineaRemitoRepositorySequelize extends LineaRemitoRepository {
  
  async create(data) {
    const nuevaLinea = await LineaRemito.create(data);
    return await nuevaLinea.reload({ 
      include: [
        { model: Remito },
        { 
          model: Existencia,
          include: [{ model: Producto }]
        }
      ]
    });
  }

  async findAll(filter = {}) {
    const { remitoId, existenciaId, offset, pageSize, orderBy, orderDir } = filter;
    
    const whereClause = {};

    // Filtros por ID
    if (remitoId) whereClause.remitoId = Number(remitoId);
    if (existenciaId) whereClause.existenciaId = Number(existenciaId);

    const rows = await LineaRemito.findAll({
      where: whereClause,
      include: [
        { model: Remito },
        { 
          model: Existencia,
          include: [{ model: Producto }]
        }
      ],
      order: [[orderBy || 'id', orderDir || 'ASC']],
      offset: offset || 0,
      limit: pageSize || 10
    });

    const total = await LineaRemito.count({ where: whereClause });

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
    return await LineaRemito.findByPk(id, {
      include: [
        { model: Remito },
        { 
          model: Existencia,
          include: [{ model: Producto }]
        }
      ]
    });
  }

  async findByRemitoId(remitoId) {
    return await LineaRemito.findAll({
      where: { remitoId: Number(remitoId) },
      include: [
        { model: Remito },
        { 
          model: Existencia,
          include: [{ model: Producto }]
        }
      ],
      order: [['id', 'ASC']]
    });
  }

  async update(id, data) {
    const linea = await LineaRemito.findByPk(id);
    if (!linea) return null;
    
    await linea.update(data);
    return await linea.reload({ 
      include: [
        { model: Remito },
        { 
          model: Existencia,
          include: [{ model: Producto }]
        }
      ]
    });
  }

  async delete(id) {
    const linea = await LineaRemito.findByPk(id);
    if (!linea) return false;
    await linea.destroy();
    return true;
  }
}

module.exports = LineaRemitoRepositorySequelize;