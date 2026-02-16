const { Cliente } = require("../../infrastructure/database/models");

const clienteRepository = {
  findAll: async () => await Cliente.findAll(),

  findById: async (id) => await Cliente.findByPk(id),

  create: async (data) => await Cliente.create(data),

  update: async (id, data) => {
    const cliente = await Cliente.findByPk(id);
    return await cliente.update(data);
  },

  delete: async (id) => {
    const cliente = await Cliente.findByPk(id);
    return await cliente.destroy();
  },
};
module.exports = clienteRepository;