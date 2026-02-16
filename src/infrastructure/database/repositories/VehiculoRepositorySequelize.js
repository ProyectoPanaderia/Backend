const VehiculoRepository = require('../../../domain/repositories/vehiculoRepository');
const { Vehiculo } = require('../models/models');

class VehiculoRepositorySequelize extends VehiculoRepository {
  async create(data) {
    return await Vehiculo.create(data);
  }

  async findAll(filter = {}) {
    const offset = filter.offset || 0;
    const limit = filter.pageSize || 10;
    const order = [[filter.orderBy || 'id', filter.orderDir || 'ASC']];

    const { count, rows } = await Vehiculo.findAndCountAll({
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
    return await Vehiculo.findByPk(id, { include: ['Reparto'] });
  }

  async findByRepartoId(repartoId) {
    return await Vehiculo.findAll({
      where: { repartoId },
      include: ['Reparto']
    });
  }

  async update(id, data) {
    const vehiculo = await Vehiculo.findByPk(id);
    if (!vehiculo) return null;
    return await vehiculo.update(data);
  }

  async delete(id) {
    const vehiculo = await Vehiculo.findByPk(id);
    if (!vehiculo) return false;
    await vehiculo.destroy();
    return true;
  }
}

module.exports = VehiculoRepositorySequelize;