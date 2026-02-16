const { Ciudad } = require("../../infrastructure/database/models");

const ciudadRepository = {
  findAll: async () => await Ciudad.findAll(),

  findById: async (id) => await Ciudad.findByPk(id),

  create: async (data) => await Ciudad.create(data),

  update: async (id, data) => {
    const ciudad = await Ciudad.findByPk(id);
    return await ciudad.update(data);
  },

  delete: async (id) => {
    const ciudad = await Ciudad.findByPk(id);
    return await ciudad.destroy();
  },
};
module.exports = ciudadRepository;