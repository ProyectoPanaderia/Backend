const { Remito, Cliente, Reparto, LineaRemito } = require('../models/models.js');
const { Op } = require('sequelize');
const RemitoRepository = require('../../../domain/repositories/remitoRepository');

class RemitoRepositorySequelize extends RemitoRepository {
  
  async create(data) {
    const nuevoRemito = await Remito.create(data);
    return await nuevoRemito.reload({ 
      include: [
        { model: Cliente },
        { model: Reparto },
        { model: LineaRemito }
      ]
    });
  }

  async findAll(filter = {}) {
    const { clienteId, repartoId, fechaDesde, fechaHasta, offset, pageSize, orderBy, orderDir } = filter;
    
    const whereClause = {};

    // Filtros por ID
    if (clienteId) whereClause.clienteId = Number(clienteId);
    if (repartoId) whereClause.repartoId = Number(repartoId);

    // Filtro por rango de fechas
    if (fechaDesde || fechaHasta) {
      whereClause.fecha = {};
      
      if (fechaDesde) {
        const inicio = new Date(fechaDesde);
        whereClause.fecha[Op.gte] = inicio;
      }
      
      if (fechaHasta) {
        const fin = new Date(fechaHasta);
        fin.setHours(23, 59, 59, 999);
        whereClause.fecha[Op.lte] = fin;
      }
    }

    const rows = await Remito.findAll({
      where: whereClause,
      include: [
        { model: Cliente },
        { model: Reparto },
        { model: LineaRemito }
      ],
      order: [[orderBy || 'fecha', orderDir || 'DESC']],
      offset: offset || 0,
      limit: pageSize || 10
    });

    const total = await Remito.count({ where: whereClause });

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
    return await Remito.findByPk(id, {
      include: [
        { model: Cliente },
        { model: Reparto },
        { model: LineaRemito }
      ]
    });
  }

  async update(id, data) {
    const remito = await Remito.findByPk(id);
    if (!remito) return null;
    
    await remito.update(data);
    return await remito.reload({ 
      include: [
        { model: Cliente },
        { model: Reparto },
        { model: LineaRemito }
      ]
    });
  }

  async delete(id) {
    const remito = await Remito.findByPk(id);
    if (!remito) return false;
    await remito.destroy();
    return true;
  }
}

module.exports = RemitoRepositorySequelize;