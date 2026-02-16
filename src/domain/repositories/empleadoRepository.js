const { Empleado } = require("../../infrastructure/database/models");

const empleadoRepository = {
  findAll: async () => await Empleado.findAll(),

  findById: async (id) => await Empleado.findByPk(id),

  create: async (data) => await Empleado.create(data),

  update: async (id, data) => {
    const empleado = await Empleado.findByPk(id);
    return await empleado.update(data);
  },

  delete: async (id) => {
    const empleado = await Empleado.findByPk(id);
    return await empleado.destroy();
  },
};
module.exports = empleadoRepository;