const { Vehiculo } = require("../../infrastructure/database/models");

const vehiculoRepository = {
  findAll: async () => await Vehiculo.findAll(),

  findById: async (id) => await Vehiculo.findByPk(id),

  create: async (data) => await Vehiculo.create(data),

  update: async (id, data) => {
    const vehiculo = await Vehiculo.findByPk(id);
    return await vehiculo.update(data);
  },

  delete: async (id) => {
    const vehiculo = await Vehiculo.findByPk(id);
    return await vehiculo.destroy();
  },
};
module.exports = vehiculoRepository;