const { Reparto } = require('../models/models.js');
const RepartoRepository = require('../../../domain/repositories/repartoRepository');
const { Op } = require('sequelize');

class RepartoRepositorySequelize extends RepartoRepository {
  async create(data) {
    return await Reparto.create(data);
  }

  // Listar con filtros y paginación
  async findAll(filter) {
    const where = {};

    // Filtro textual por nombre
    if (filter.q) {
      where.nombre = { [Op.like]: `%${filter.q}%` };
    }

    // Filtro por tercerizado
    if (filter.tercerizado) {
      where.tercerizado = filter.tercerizado;
    }

    // Filtro por estado
    if (filter.estado) {
      where.estado = filter.estado;
    }

    const offset = (filter.page - 1) * filter.pageSize;
    const limit = filter.pageSize;

    const { rows, count } = await Reparto.findAndCountAll({
      where,
      order: [[filter.orderBy, filter.orderDir]],
      offset,
      limit,
    });

    return {
      data: rows,
      meta: {
        total: count,
        page: filter.page,
        pageSize: filter.pageSize,
      },
    };
  }

  async findById(id) {
    return await Reparto.findByPk(id);
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
