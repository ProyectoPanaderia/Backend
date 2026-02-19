const { Remito, Cliente, Reparto, LineaRemito, Existencia, sequelize } = require('../models/models.js');
const { Op } = require('sequelize');
const RemitoRepository = require('../../../domain/repositories/remitoRepository');

class RemitoRepositorySequelize extends RemitoRepository {
  
async create(dto) {
    // ej: falta stock, se cancela todo
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

        // Buscar todas las existencias (lotes) de este producto en este camión (reparto)
        // Ordenadas por ID ascendente (asumiendo que ID menor = lote más viejo)
        // Solo traemos las que tienen cantidad > 0
        const lotesDisponibles = await Existencia.findAll({
          where: {
            repartoId: dto.repartoId,
            productoId: lineaReq.productoId,
            cantidad: { [Op.gt]: 0 }
          },
          order: [['id', 'ASC']],
          transaction: t
        });

        // Verificar si la suma de todos los lotes alcanza para el pedido
        const stockTotal = lotesDisponibles.reduce((sum, lote) => sum + lote.cantidad, 0);
        if (stockTotal < cantidadFaltante) {
          throw new Error(`Stock insuficiente para el producto ID ${lineaReq.productoId}. Solicitado: ${cantidadFaltante}, Disponible: ${stockTotal}`);
        }

        // Consumir lotes (FIFO)
        for (const lote of lotesDisponibles) {
          if (cantidadFaltante <= 0) break;

          const cantidadATomarDeEsteLote = Math.min(lote.cantidad, cantidadFaltante);
          
          // Actualizar el lote restando lo que tomamos
          await lote.update({
            cantidad: lote.cantidad - cantidadATomarDeEsteLote
          }, { transaction: t });

          // Calcular el subtotal proporcional para este fragmento de línea
          const subtotalProporcional = cantidadATomarDeEsteLote * lineaReq.precioUnitario;

          // Crear la línea del remito asociada a este lote específico
          await LineaRemito.create({
            remitoId: nuevoRemito.id,
            existenciaId: lote.id,
            cantidad: cantidadATomarDeEsteLote,
            subtotal: subtotalProporcional
          }, { transaction: t });

          cantidadFaltante -= cantidadATomarDeEsteLote;
        }
      }

      // Si llegamos hasta acá, todo salió bien. Confirmamos la transacción.
      await t.commit();

      // Devolvemos el remito completo con sus relaciones
      return await nuevoRemito.reload({ 
        include: [
          { model: Cliente },
          { model: Reparto },
          { model: LineaRemito }
        ]
      });

    } catch (error) {
      // Si hubo cualquier error (ej. falta de stock), deshacemos todo
      await t.rollback();
      throw error; // Relanzamos el error para que el AppService / Controller lo atrape y mande el HTTP 400
    }
  }

  async findAll(filter = {}) {
    const { clienteId, repartoId, fechaDesde, fechaHasta, offset, pageSize, orderBy, orderDir } = filter;
    
    const whereClause = {};

    // Filtros por ID
    if (clienteId) whereClause.clienteId = Number(clienteId);
    if (repartoId) whereClause.repartoId = Number(repartoId);

    // Filtro por rango de fechas
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
        { model: LineaRemito }
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
        { model: LineaRemito }
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
        { model: LineaRemito }
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