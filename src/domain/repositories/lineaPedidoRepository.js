const { LineaPedido } = require("../../infrastructure/database/models");

const lineaPedidoRepository = {
  findAll: async () => await LineaPedido.findAll(),

  findById: async (id) => await LineaPedido.findByPk(id),

  create: async (data) => await LineaPedido.create(data),

  update: async (id, data) => {
    const lineaPedido = await LineaPedido.findByPk(id);
    return await lineaPedido.update(data);
  },

  delete: async (id) => {
    const lineaPedido = await LineaPedido.findByPk(id);
    return await lineaPedido.destroy();
  },
};
module.exports = lineaPedidoRepository;