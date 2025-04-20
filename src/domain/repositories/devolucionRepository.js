const { Devolucion } = require("../../infrastructure/database/models");

const devolucionRepository = {
  findAll: async () => await Devolucion.findAll(),

  findById: async (id) => await Devolucion.findByPk(id),

  create: async (data) => await Devolucion.create(data),

  update: async (id, data) => {
    const devolucion = await Devolucion.findByPk(id);
    return await devolucion.update(data);
  },

  delete: async (id) => {
    const devolucion = await Devolucion.findByPk(id);
    return await devolucion.destroy();
  },
};
module.exports = devolucionRepository;