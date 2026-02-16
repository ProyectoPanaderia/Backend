const { Devolucion, Reparto, LineaDevolucion, Existencia, Producto } = require('../models/models.js');
const { Op } = require('sequelize');
const DevolucionRepository = require('../../../domain/repositories/devolucionRepository');

class DevolucionRepositorySequelize extends DevolucionRepository {
  
  async create(data) {
    const nuevaDevolucion = await Devolucion.create(data);
    return await nuevaDevolucion.reload({ 
      include: [
        { model: Reparto },
        { 
          model: LineaDevolucion,
          include: [{ 
            model: Existencia,
            include: [{ model: Producto }]
          }]
        }
      ]
    });
  }

  async findAll(filter = {}) {
    const { repartoId, fechaDesde, fechaHasta, razon, offset, pageSize, orderBy, orderDir } = filter;
    
    const whereClause = {};

    // Filtro por repartoId
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

    // Filtro por razón (búsqueda parcial)
    if (razon) {
      whereClause.razon = { [Op.like]: `%${razon}%` };
    }

    const rows = await Devolucion.findAll({
      where: whereClause,
      include: [
        { model: Reparto },
        { 
          model: LineaDevolucion,
          include: [{ 
            model: Existencia,
            include: [{ model: Producto }]
          }]
        }
      ],
      order: [[orderBy || 'fecha', orderDir || 'DESC']],
      offset: offset || 0,
      limit: pageSize || 10
    });

    const total = await Devolucion.count({ where: whereClause });

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
    return await Devolucion.findByPk(id, {
      include: [
        { model: Reparto },
        { 
          model: LineaDevolucion,
          include: [{ 
            model: Existencia,
            include: [{ model: Producto }]
          }]
        }
      ]
    });
  }

  async findByRepartoId(repartoId) {
    return await Devolucion.findAll({
      where: { repartoId: Number(repartoId) },
      include: [
        { model: Reparto },
        { 
          model: LineaDevolucion,
          include: [{ 
            model: Existencia,
            include: [{ model: Producto }]
          }]
        }
      ],
      order: [['fecha', 'DESC']]
    });
  }

  async update(id, data) {
    const devolucion = await Devolucion.findByPk(id);
    if (!devolucion) return null;
    
    await devolucion.update(data);
    return await devolucion.reload({ 
      include: [
        { model: Reparto },
        { 
          model: LineaDevolucion,
          include: [{ 
            model: Existencia,
            include: [{ model: Producto }]
          }]
        }
      ]
    });
  }

  async delete(id) {
    const devolucion = await Devolucion.findByPk(id);
    if (!devolucion) return false;
    await devolucion.destroy();
    return true;
  }
}

module.exports = DevolucionRepositorySequelize;