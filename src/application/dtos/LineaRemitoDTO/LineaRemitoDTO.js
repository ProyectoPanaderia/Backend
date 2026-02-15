/**
 * Mapea un objeto de dominio/Sequelize a DTO plano seguro
 * @param {any} linea - Instancia Sequelize o objeto plano
 * @returns {any|null}
 */
function lineaRemitoDTO(linea) {
  if (!linea) return null;

  // Si viene una instancia Sequelize, convertir a objeto plano
  const row = typeof linea.get === 'function' ? linea.get({ plain: true }) : linea;

  return {
    id: row.id,
    cantidad: row.cantidad,
    subtotal: row.subtotal,
    remitoId: row.remitoId,
    existenciaId: row.existenciaId,
    
    // Relaciones (si el Include de Sequelize las trajo)
    Remito: row.Remito ? {
      id: row.Remito.id,
      total: row.Remito.total,
      fecha: row.Remito.fecha,
      clienteId: row.Remito.clienteId,
      repartoId: row.Remito.repartoId
    } : null,
    
    Existencia: row.Existencia ? {
      id: row.Existencia.id,
      cantidad: row.Existencia.cantidad,
      fechaE: row.Existencia.fechaE,
      fechaV: row.Existencia.fechaV,
      productoId: row.Existencia.productoId,
      repartoId: row.Existencia.repartoId,
      Producto: row.Existencia.Producto ? {
        id: row.Existencia.Producto.id,
        nombre: row.Existencia.Producto.nombre,
        peso: row.Existencia.Producto.peso
      } : null
    } : null
  };
}

module.exports = lineaRemitoDTO;