const { Existencia, Producto, Reparto } = require('../models/models.js');
const ExistenciaRepository = require('../../../domain/repositories/existenciaRepository');

class ExistenciaRepositorySequelize extends ExistenciaRepository {
  
  async create(data) {
    const nueva = await Existencia.create(data);

    return await nueva.reload({ include: [Producto, Reparto] });
  }

async findAll(filter = {}) {
    const { productoId, repartoId, fechaVencimiento, fechaElaboracion } = filter;
    
    const whereClause = {};

    // filtros por id
    if (productoId) whereClause.productoId = Number(productoId);
    if (repartoId) whereClause.repartoId = Number(repartoId);

    // filtro vencimiento
    if (fechaVencimiento) {
      const inicio = new Date(fechaVencimiento);
      const fin = new Date(fechaVencimiento);
      fin.setHours(23, 59, 59, 999);
      whereClause.fechaVencimiento = { [Op.between]: [inicio, fin] };
    }

    // filtro elaboracion
    if (fechaElaboracion) {
      const inicio = new Date(fechaElaboracion);
      const fin = new Date(fechaElaboracion);
      fin.setHours(23, 59, 59, 999);
      whereClause.fechaElaboracion = { [Op.between]: [inicio, fin] };
    }

    const rows = await Existencia.findAll({
      where: whereClause,
      include: [
        { model: Producto }, 
        { model: Reparto }
      ],
      order: [['id', 'DESC']]
    });

    return {
      data: rows,
      meta: { total: rows.length }
    };
  }

  async findById(id) {
    return await Existencia.findByPk(id, {
      include: [Producto, Reparto]
    });
  }

  async update(id, data) {
    const existencia = await Existencia.findByPk(id);
    if (!existencia) return null;
    
    await existencia.update(data);
    return await existencia.reload({ include: [Producto, Reparto] });
  }

  async delete(id) {
    const existencia = await Existencia.findByPk(id);
    if (!existencia) return false;
    await existencia.destroy();
    return true;
  }
}

module.exports = ExistenciaRepositorySequelize;