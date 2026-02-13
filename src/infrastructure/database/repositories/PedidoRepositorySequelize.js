const { Op } = require('sequelize');
const { Pedido, LineaPedido, Cliente, Reparto, Producto, sequelize } = require('../models/models.js');
const PedidoRepository = require('../../../domain/repositories/pedidoRepository');

class PedidoRepositorySequelize extends PedidoRepository {

  async create(data) {
    // Usamos una transacción para que si fallan las líneas, no se guarde el pedido vacío.
    const t = await sequelize.transaction();

    try {
      // 1. Creamos la cabecera del pedido
      const nuevoPedido = await Pedido.create({
        fechaEmision: data.fechaEmision,
        fechaEntrega: data.fechaEntrega,
        repartoId: data.repartoId,
        clienteId: data.clienteId,
        estado: data.estado,
        total: data.total
      }, { transaction: t });

      // 2. Preparamos las líneas agregando el ID del pedido recién creado
      const lineasConId = data.lineas.map(l => ({
        pedidoId: nuevoPedido.id,
        productoId: l.productoId,
        cantidad: l.cantidad,
        precioUnitario: l.precioUnitario,
        subtotal: l.subtotal,
        descripcion: l.descripcion, // Snapshot del nombre
        notas: l.notas
      }));

      // 3. Insertamos las líneas en lote
      await LineaPedido.bulkCreate(lineasConId, { transaction: t });

      // 4. Confirmamos la transacción
      await t.commit();

      // 5. Devolvemos el pedido completo con sus relaciones
      return await this.findById(nuevoPedido.id);

    } catch (error) {
      await t.rollback(); // Si algo falla, deshacemos todo
      throw error;
    }
  }

  async findAll(filter = {}) {
    const { 
      clienteId, 
      repartoId, 
      estado, 
      fechaEmisionDesde, 
      fechaEmisionHasta,
      fechaEntregaDesde,
      fechaEntregaHasta,
      page = 1,
      pageSize = 20
    } = filter;

    const whereClause = {};

    // Filtros directos
    if (clienteId) whereClause.clienteId = Number(clienteId);
    if (repartoId) whereClause.repartoId = Number(repartoId);
    if (estado) whereClause.estado = estado;

    // Filtro Rango Fecha Emisión
    if (fechaEmisionDesde && fechaEmisionHasta) {
      whereClause.fechaEmision = { 
        [Op.between]: [new Date(fechaEmisionDesde), new Date(fechaEmisionHasta)] 
      };
    }

    // Filtro Rango Fecha Entrega
    if (fechaEntregaDesde && fechaEntregaHasta) {
      whereClause.fechaEntrega = { 
        [Op.between]: [new Date(fechaEntregaDesde), new Date(fechaEntregaHasta)] 
      };
    }

    const limit = Number(pageSize);
    const offset = (Number(page) - 1) * limit;

    // Usamos findAndCountAll para paginación
    const { count, rows } = await Pedido.findAndCountAll({
      where: whereClause,
      include: [
        { model: Cliente },
        { model: Reparto },
        // Incluimos líneas solo si es necesario para el listado (opcional)
        // { model: LineaPedido } 
      ],
      limit,
      offset,
      order: [['fechaEmision', 'DESC']],
      distinct: true // Para que el count no se duplique por las líneas
    });

    return {
      data: rows,
      meta: { 
        total: count,
        page: Number(page),
        pageSize: limit,
        totalPages: Math.ceil(count / limit)
      }
    };
  }

  async findById(id) {
    return await Pedido.findByPk(id, {
      include: [
        { model: Cliente },
        { model: Reparto },
        { 
          model: LineaPedido,
          include: [{ model: Producto, attributes: ['nombre', 'peso'] }] // Info extra del producto
        }
      ]
    });
  }

  async update(id, data) {
    const pedido = await Pedido.findByPk(id);
    if (!pedido) return null;

    // Actualizamos solo los campos que vienen en data
    await pedido.update(data);

    // Devolvemos el pedido actualizado
    return await this.findById(id);
  }

  // Método especial optimizado para solo cambiar estado (sin cargar relaciones)
  async updateEstado(id, nuevoEstado) {
    const pedido = await Pedido.findByPk(id);
    if (!pedido) return null;

    pedido.estado = nuevoEstado;
    await pedido.save();
    
    return pedido;
  }

  async delete(id) {
    const pedido = await Pedido.findByPk(id);
    if (!pedido) return false;

    // Al borrar el pedido, Sequelize borra las líneas si está configurado el CASCADE en el modelo.
    await pedido.destroy();
    return true;
  }
}

module.exports = PedidoRepositorySequelize;