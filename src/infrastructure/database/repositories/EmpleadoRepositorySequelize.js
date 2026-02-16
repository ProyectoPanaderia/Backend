const EmpleadoRepository = require('../../../domain/repositories/empleadoRepository');
const { Empleado } = require('../models/models');

class EmpleadoRepositorySequelize extends EmpleadoRepository {
  async create(data) {
    return await Empleado.create(data);
  }

  async findAll(filter = {}) {
    const offset = filter.offset || 0;
    const limit = filter.pageSize || 10;
    const order = [[filter.orderBy || 'id', filter.orderDir || 'ASC']];

    const where = {};
    if (filter.nombre) where.nombre = { [require('sequelize').Op.like]: `%${filter.nombre}%` };
    if (filter.repartoId) where.repartoId = filter.repartoId;

    const { count, rows } = await Empleado.findAndCountAll({
      where,
      offset,
      limit,
      order,
      include: ['Reparto']
    });

    return {
      data: rows,
      meta: {
        total: count,
        page: Math.floor(offset / limit) + 1,
        pageSize: limit,
        totalPages: Math.ceil(count / limit)
      }
    };
  }

  async findById(id) {
    return await Empleado.findByPk(id, { include: ['Reparto'] });
  }

  async findByRepartoId(repartoId) {
    return await Empleado.findAll({
      where: { repartoId },
      include: ['Reparto']
    });
  }

  async update(id, data) {
    const empleado = await Empleado.findByPk(id);
    if (!empleado) return null;
    return await empleado.update(data);
  }

  async delete(id) {
    const empleado = await Empleado.findByPk(id);
    if (!empleado) return false;
    await empleado.destroy();
    return true;
  }
}

module.exports = EmpleadoRepositorySequelize;