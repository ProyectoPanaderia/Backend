const { Op } = require('sequelize');
const { Devolucion, LineaDevolucion, Cliente, Reparto, Existencia, Producto, sequelize } = require('../models/models');

class DevolucionRepositorySequelize {
  
async create(data) {
    const t = await sequelize.transaction();

    try {
      // 1. Creamos la cabecera
      const nuevaDevolucion = await Devolucion.create({
        fecha: data.fecha,
        razon: data.razon,
        repartoId: data.repartoId,
        clienteId: data.clienteId,
        total: data.total
      }, { transaction: t });

      // 2. Preparamos las líneas atándolas al ID recién creado
      const lineasConId = data.lineas.map(l => ({
        devolucionId: nuevaDevolucion.id,
        productoId: l.productoId,
        cantidad: l.cantidad,
        precioUnitario: l.precioUnitario,
        subtotal: l.subtotal
      }));

      // 3. Insertamos las líneas
      await LineaDevolucion.bulkCreate(lineasConId, { transaction: t });

      // 4. CONFIRMAMOS. A partir de acá, no se puede hacer rollback.
      await t.commit();

      // Devolvemos la devolución completa
      return await this.findById(nuevaDevolucion.id);

    } catch (error) {
      // BLINDAJE: Solo hacemos rollback si no se llegó al commit
      if (!t.finished) {
        await t.rollback();
      }
      throw error;
    }
  }

  async findAll(filter = {}) {
    const { fechaDesde, fechaHasta, repartoId, clienteId, razon, page = 1, pageSize = 20 } = filter;
    const whereClause = {};

    if (repartoId) whereClause.repartoId = Number(repartoId);
    if (clienteId) whereClause.clienteId = Number(clienteId);
    if (razon) whereClause.razon = { [Op.like]: `%${razon}%` };

    if (fechaDesde && fechaHasta) {
      whereClause.fecha = { [Op.between]: [new Date(fechaDesde), new Date(fechaHasta)] };
    }

    const limit = Number(pageSize);
    const offset = (Number(page) - 1) * limit;

    const { count, rows } = await Devolucion.findAndCountAll({
      where: whereClause,
      include: [
        { model: Cliente },
        { model: Reparto }
      ],
      limit,
      offset,
      order: [['fecha', 'DESC']],
      distinct: true
    });

    return {
      data: rows,
      meta: { total: count, page: Number(page), pageSize: limit, totalPages: Math.ceil(count / limit) }
    };
  }

async findById(id) {
    return await Devolucion.findByPk(id, {
      include: [
        { model: Cliente },
        { model: Reparto },
        { 
          model: LineaDevolucion,
          // ACÁ ESTABA EL ERROR: Ahora incluimos Producto directo
          include: [{ model: Producto, attributes: ['nombre'] }] 
        }
      ]
    });
  }

  async update(id, data) {
    const devolucion = await Devolucion.findByPk(id);
    if (!devolucion) return null;
    await devolucion.update(data);
    return await this.findById(id);
  }

  async delete(id) {
    const devolucion = await Devolucion.findByPk(id);
    if (!devolucion) return false;
    await devolucion.destroy();
    return true;
  }
}

module.exports = DevolucionRepositorySequelize;