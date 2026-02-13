const { LineaPedido } = require('../models/models.js');
const LineaPedidoRepository = require('../../../domain/repositories/lineaPedidoRepository.js');

class LineaPedidoRepositorySequelize extends LineaPedidoRepository {
  async create(data) {
    return await LineaPedido.create(data);
  }
  
  async findAll(filter) {
    const rows = await LineaPedido.findAll(); // ✅ usar el import directo
    return {
      data: rows,
      meta: { total: rows.length }
    };
  }

  async findById(id) {
    return await LineaPedido.findByPk(id);
  }

  async update(id, data) {
    const lineaPedido = await LineaPedido.findByPk(id);
    if (!lineaPedido) return null;
    return await lineaPedido.update(data);
  }

  async delete(id) {
    const lineaPedido = await LineaPedido.findByPk(id);
    if (!lineaPedido) return false;
    await lineaPedido.destroy();
    return true;
  }
}

module.exports = LineaPedidoRepositorySequelize;