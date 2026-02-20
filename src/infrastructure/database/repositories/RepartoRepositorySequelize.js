const { Reparto, Empleado } = require('../models/models.js'); 
const RepartoRepository = require('../../../domain/repositories/repartoRepository');
const { Op } = require('sequelize');

class RepartoRepositorySequelize extends RepartoRepository {
  async create(data) {
    return await Reparto.create(data);
  }

async findAll(filter = {}) {
    const where = {};

    // Filtros de búsqueda y seguridad
    if (filter.id) where.id = filter.id;
    if (filter.q) where.nombre = { [Op.like]: `%${filter.q}%` };
    if (filter.tercerizado) where.tercerizado = filter.tercerizado;
    if (filter.estado) where.estado = filter.estado;

    const page = filter.page || 1;
    const pageSize = filter.pageSize || 10;
    const offset = (page - 1) * pageSize;
    const limit = pageSize;
    const orderBy = filter.orderBy || 'id';
    const orderDir = filter.orderDir || 'ASC';

    const { rows, count } = await Reparto.findAndCountAll({
      where,
      order: [[orderBy, orderDir]],
      offset,
      raw: true,
      nest: true,
      limit
    });

    return {
      data: rows,
      meta: {
        total: count,
        page: page,
        pageSize: pageSize,
      },
    };
  }

  async findById(id) {
    const res = await Reparto.findByPk(id, { 
      include: [{ model: Empleado }]
    });
    return res ? res.get({ plain: true }) : null;
  }

  async update(id, data) {
    const reparto = await Reparto.findByPk(id);
    if (!reparto) return null;
    return await reparto.update(data);
  }

  async delete(id) {
    const reparto = await Reparto.findByPk(id);
    if (!reparto) return false;
    await reparto.destroy();
    return true;
  }
}

module.exports = RepartoRepositorySequelize;