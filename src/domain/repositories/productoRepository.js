const { Producto: ProductoModel } = require("../../infrastructure/database/models");
const Producto = require("../../domain/entities/producto"); // tu entidad de dominio

const toDomain = (row) => new Producto(row.id, row.nombre, row.peso);

const productoRepository = {
  async findAll({ limit = 50, offset = 0, attributes } = {}) {
    const rows = await ProductoModel.findAll({ limit, offset, attributes });
    return rows.map(r => toDomain(r.get({ plain: true })));
  },

  async findById(id) {
    const row = await ProductoModel.findByPk(id);
    return row ? toDomain(row.get({ plain: true })) : null;
  },

  async create(data) {
    const row = await ProductoModel.create(data);
    return toDomain(row.get({ plain: true }));
  },

  async update(id, data) {
    const [affected] = await ProductoModel.update(data, { where: { id } });
    if (!affected) return null;                  // no existe el id
    const row = await ProductoModel.findByPk(id); // segunda query por MySQL
    return toDomain(row.get({ plain: true }));
  },

  async delete(id) {
    const deleted = await ProductoModel.destroy({ where: { id } });
    return deleted > 0; // true si borró, false si no existía
  },
};

module.exports = productoRepository;