const { Remito } = require("../../infrastructure/database/models");

const remitoRepository = {
  findAll: async () => await Remito.findAll(),

  findById: async (id) => await Remito.findByPk(id),

  create: async (data) => await Remito.create(data),

  update: async (id, data) => {
    const remito = await Remito.findByPk(id);
    return await remito.update(data);
  },

  delete: async (id) => {
    const remito = await Remito.findByPk(id);
    return await remito.destroy();
  },
};
module.exports = remitoRepository;