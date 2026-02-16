module.exports = ProductoRepository;

const { Producto } = require("../../infrastructure/database/models");

const productoRepository = {
  findAll: async () => await Producto.findAll(),

  findById: async (id) => await Producto.findByPk(id),

  create: async (data) => await Producto.create(data),

  update: async (id, data) => {
    const producto = await Producto.findByPk(id);
    return await producto.update(data);
  },

  delete: async (id) => {
    const producto = await Producto.findByPk(id);
    return await producto.destroy();
  },
};
module.exports = productoRepository;