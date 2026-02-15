/**
 * Mapea un objeto de dominio/Sequelize a DTO plano seguro
 * @param {any} remito - Instancia Sequelize o objeto plano
 * @returns {any|null}
 */
function remitoDTO(remito) {
  if (!remito) return null;

  // Si viene una instancia Sequelize, convertir a objeto plano
  const row = typeof remito.get === 'function' ? remito.get({ plain: true }) : remito;

  return {
    id: row.id,
    total: row.total,
    fecha: row.fecha,
    clienteId: row.clienteId,
    repartoId: row.repartoId,
    
    // Relaciones (si el Include de Sequelize las trajo)
    Cliente: row.Cliente ? {
      id: row.Cliente.id,
      nombre: row.Cliente.nombre,
      ciudadId: row.Cliente.ciudadId
    } : null,
    
    Reparto: row.Reparto ? {
      id: row.Reparto.id,
      nombre: row.Reparto.nombre,
      tercerizado: row.Reparto.tercerizado,
      estado: row.Reparto.estado
    } : null,
    
    // LineaRemitoDTO si existen detalles
    LineasRemito: row.LineasRemito ? row.LineasRemito.map(linea => ({
      id: linea.id,
      cantidad: linea.cantidad,
      subtotal: linea.subtotal,
      existenciaId: linea.existenciaId
    })) : []
  };
}

module.exports = remitoDTO;