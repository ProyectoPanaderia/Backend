function remitoDTO(remito) {
  if (!remito) return null;
  const row = typeof remito.get === 'function' ? remito.get({ plain: true }) : remito;
  
  return {
    id: row.id,
    total: row.total,
    fecha: row.fecha,
    clienteId: row.clienteId,
    repartoId: row.repartoId,
    
    // Cambiar a minúscula para seguir convenciones JS
    cliente: row.Cliente ? {
      id: row.Cliente.id,
      nombre: row.Cliente.nombre,
      ciudadId: row.Cliente.ciudadId
    } : null,
    
    reparto: row.Reparto ? {
      id: row.Reparto.id,
      nombre: row.Reparto.nombre,
      tercerizado: row.Reparto.tercerizado,
      estado: row.Reparto.estado
    } : null,
    
    lineasRemito: row.LineasRemito ? row.LineasRemito.map(linea => ({
      id: linea.id,
      cantidad: linea.cantidad,
      subtotal: linea.subtotal,
      existenciaId: linea.existenciaId
    })) : []
  };
}
module.exports = remitoDTO;