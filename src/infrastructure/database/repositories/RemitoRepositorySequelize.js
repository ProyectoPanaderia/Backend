const { Remito, Cliente, Reparto, LineaRemito, Existencia, Producto, sequelize } = require('../models/models.js');
const { Op } = require('sequelize');
const RemitoRepository = require('../../../domain/repositories/remitoRepository');

class RemitoRepositorySequelize extends RemitoRepository {
  
async create(dto) {
    const t = await sequelize.transaction();

    try {
      // 1. Crear la cabecera del Remito
      const nuevoRemito = await Remito.create({
        fecha: dto.fecha,
        total: dto.total,
        clienteId: dto.clienteId,
        repartoId: dto.repartoId
      }, { transaction: t });

      // 2. Procesar las líneas usando lógica FIFO
      for (const lineaReq of dto.lineas) {
        let cantidadFaltante = lineaReq.cantidad;

        const lotesDisponibles = await Existencia.findAll({
          where: {
            repartoId: dto.repartoId,
            productoId: lineaReq.productoId,
            cantidad: { [Op.gt]: 0 }
          },
          order: [['id', 'ASC']],
          transaction: t
        });

        const stockTotal = lotesDisponibles.reduce((sum, lote) => sum + lote.cantidad, 0);
        if (stockTotal < cantidadFaltante) {
          throw new Error(`Stock insuficiente para el producto ID ${lineaReq.productoId}. Solicitado: ${cantidadFaltante}, Disponible: ${stockTotal}`);
        }

        for (const lote of lotesDisponibles) {
          if (cantidadFaltante <= 0) break;

          const cantidadATomarDeEsteLote = Math.min(lote.cantidad, cantidadFaltante);
          
          await lote.update({
            cantidad: lote.cantidad - cantidadATomarDeEsteLote
          }, { transaction: t });

          const subtotalProporcional = cantidadATomarDeEsteLote * lineaReq.precioUnitario;

          await LineaRemito.create({
            remitoId: nuevoRemito.id,
            existenciaId: lote.id,
            cantidad: cantidadATomarDeEsteLote,
            subtotal: subtotalProporcional
          }, { transaction: t });

          cantidadFaltante -= cantidadATomarDeEsteLote;
        }
      }

      await t.commit();

      // Devolver con includes completos incluyendo Producto
      return await nuevoRemito.reload({ 
        include: [
          { model: Cliente },
          { model: Reparto },
          { 
            model: LineaRemito,
            include: [
              {
                model: Existencia,
                include: [Producto]
              }
            ]
          }
        ]
      });

    } catch (error) {
      await t.rollback();
      throw error;
    }
  }

  async findAll(filter = {}) {
    const { clienteId, repartoId, fechaDesde, fechaHasta, offset, pageSize, orderBy, orderDir } = filter;
    
    const whereClause = {};

    if (clienteId) whereClause.clienteId = Number(clienteId);
    if (repartoId) whereClause.repartoId = Number(repartoId);

    if (fechaDesde || fechaHasta) {
      whereClause.fecha = {};
      
      if (fechaDesde) {
        const inicio = new Date(fechaDesde);
        whereClause.fecha[Op.gte] = inicio;
      }
      
      if (fechaHasta) {
        const fin = new Date(fechaHasta);
        fin.setHours(23, 59, 59, 999);
        whereClause.fecha[Op.lte] = fin;
      }
    }

    const rows = await Remito.findAll({
      where: whereClause,
      include: [
        { model: Cliente },
        { model: Reparto },
        { 
          model: LineaRemito,
          include: [
            {
              model: Existencia,
              include: [Producto]
            }
          ]
        }
      ],
      order: [[orderBy || 'fecha', orderDir || 'DESC']],
      offset: offset || 0,
      limit: pageSize || 10
    });

    const total = await Remito.count({ where: whereClause });

    return {
      data: rows,
      meta: {
        total,
        page: Math.floor((offset || 0) / (pageSize || 10)) + 1,
        pageSize: pageSize || 10
      }
    };
  }

  async findById(id) {
    return await Remito.findByPk(id, {
      include: [
        { model: Cliente },
        { model: Reparto },
        { 
          model: LineaRemito,
          include: [
            {
              model: Existencia,
              include: [Producto]
            }
          ]
        }
      ]
    });
  }

  async update(id, data) {
    const remito = await Remito.findByPk(id);
    if (!remito) return null;
    
    await remito.update(data);
    return await remito.reload({ 
      include: [
        { model: Cliente },
        { model: Reparto },
        { 
          model: LineaRemito,
          include: [
            {
              model: Existencia,
              include: [Producto]
            }
          ]
        }
      ]
    });
  }

  async delete(id) {
    const remito = await Remito.findByPk(id);
    if (!remito) return false;
    await remito.destroy();
    return true;
  }
}

module.exports = RemitoRepositorySequelize;