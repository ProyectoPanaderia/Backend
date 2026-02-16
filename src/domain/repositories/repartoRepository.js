const { Reparto } = require("../../infrastructure/database/models");

const repartoRepository = {
  findAll: async () => await Reparto.findAll(),

  findById: async (id) => await Reparto.findByPk(id),

  create: async (data) => await Reparto.create(data),

  update: async (id, data) => {
    const reparto = await Reparto.findByPk(id);
    return await reparto.update(data);
  },

  delete: async (id) => {
    const reparto = await Reparto.findByPk(id);
    return await reparto.destroy();
  },
};
module.exports = repartoRepository;