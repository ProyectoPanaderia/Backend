const { Cliente, Ciudad } = require('../models/models.js');
const ClienteRepository = require('../../../domain/repositories/clienteRepository');

class ClienteRepositorySequelize extends ClienteRepository {
  async create(data) {
    return await Cliente.create(data);
  }

  async findAll() {
    const rows = await Cliente.findAll({
      include: [{ model: Ciudad, attributes: ['nombre'] }],
      order: [['id', 'ASC']]
    });
    return {
      data: rows,
      meta: { total: rows.length }
    };
  }

  async findById(id) {
    return await Cliente.findByPk(id, {
      include: [{ model: Ciudad, attributes: ['nombre'] }]
    });
  }

  async update(id, data) {
    const cliente = await Cliente.findByPk(id);
    if (!cliente) return null;
    return await cliente.update(data);
  }

  async delete(id) {
    const cliente = await Cliente.findByPk(id);
    if (!cliente) return false;
    await cliente.destroy();
    return true;
  }
}

module.exports = ClienteRepositorySequelize;