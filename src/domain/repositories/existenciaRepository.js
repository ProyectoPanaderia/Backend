const { Existencia } = require("../../infrastructure/database/models");

const existenciaRepository = {
  findAll: async () => await Existencia.findAll(),

  findById: async (id) => await Existencia.findByPk(id),

  create: async (data) => await Existencia.create(data),

  update: async (id, data) => {
    const existencia = await Existencia.findByPk(id);
    return await existencia.update(data);
  },

  delete: async (id) => {
    const existencia = await Existencia.findByPk(id);
    return await existencia.destroy();
  },
};
module.exports = existenciaRepository;