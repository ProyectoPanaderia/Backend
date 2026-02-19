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

    // SOLUCIÓN: Buscamos solo en la tabla Repartos, sin mezclar a los empleados.
    // Esto garantiza 100% que cada ID venga una sola vez.
    const { rows, count } = await Reparto.findAndCountAll({
      where,
      order: [[orderBy, orderDir]],
      offset,
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
    return await Reparto.findByPk(id, { 
      // Acá sí dejamos el include normal por si al ver el detalle querés saber quién es el empleado
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