const LineaRemito = require("../../infrastructure/database/models/lineaRemito");

const lineaRemitoRepository = {
  findAll: async () => await LineaRemito.findAll(),

  findById: async (id) => await LineaRemito.findByPk(id),

  create: async (data) => await LineaRemito.create(data),

  update: async (id, data) => {
    const lineaRemito = await LineaRemito.findByPk(id);
    return await lineaRemito.update(data);
  },

  delete: async (id) => {
    const lineaRemito = await LineaRemito.findByPk(id);
    return await lineaRemito.destroy();
  },
};
module.exports = lineaRemitoRepository;