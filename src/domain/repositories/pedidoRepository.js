const { Pedido } = require("../../infrastructure/database/models");

const pedidoRepository = {
  findAll: async () => await Pedido.findAll(),

  findById: async (id) => await Pedido.findByPk(id),

  create: async (data) => await Pedido.create(data),

  update: async (id, data) => {
    const pedido = await Pedido.findByPk(id);
    return await pedido.update(data);
  },

  delete: async (id) => {
    const pedido = await Pedido.findByPk(id);
    return await pedido.destroy();
  },
};
module.exports = pedidoRepository;