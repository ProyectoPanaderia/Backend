const { Reparto, Empleado } = require('../models/models.js'); //
const RepartoRepository = require('../../../domain/repositories/repartoRepository');
const { Op } = require('sequelize');

class RepartoRepositorySequelize extends RepartoRepository {
  async create(data) {
    return await Reparto.create(data);
  }

  // Listar con filtros y paginación
  async findAll(filter = {}) {
    const where = {};

    // Filtro por ID (Crucial para que el repartidor vea SOLO su reparto)
    if (filter.id) {
      where.id = filter.id;
    }

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
      limit,
      // Ahora Empleado sí está definido arriba en el require
      include: [{ 
        model: Empleado 
      }]
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
    return await Reparto.findByPk(id, { 
      include: [{ model: Empleado }] 
    });
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