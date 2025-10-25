const { Ciudad } = require('../models/models.js');
const CiudadRepository = require('../../../domain/repositories/ciudadRepository');

class CiudadRepositorySequelize extends CiudadRepository {
  async create(data) {
    return await Ciudad.create(data);
  }

  async findAll() {
    const rows = await Ciudad.findAll();
    return {
      data: rows,
      meta: { total: rows.length }
    };
  }

  async findById(id) {
    return await Ciudad.findByPk(id);
  }

  async update(id, data) {
    const ciudad = await Ciudad.findByPk(id);
    if (!ciudad) return null;
    return await ciudad.update(data);
  }

  async delete(id) {
    const ciudad = await Ciudad.findByPk(id);
    if (!ciudad) return false;
    await ciudad.destroy();
    return true;
  }
}

module.exports = CiudadRepositorySequelize;