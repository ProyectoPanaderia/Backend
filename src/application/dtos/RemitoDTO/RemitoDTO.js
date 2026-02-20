function remitoDTO(remito) {
  if (!remito) return null;
  const row = typeof remito.get === 'function' ? remito.get({ plain: true }) : remito;
  
  return {
    id: row.id,
    total: row.total,
    fecha: row.fecha,
    clienteId: row.clienteId,
    repartoId: row.repartoId,
    
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
    
    lineasRemito: row.LineaRemitos ? row.LineaRemitos.map(linea => ({  // <-- CAMBIAR A LineaRemitos
      id: linea.id,
      cantidad: linea.cantidad,
      subtotal: linea.subtotal,
      existenciaId: linea.existenciaId,
      producto: linea.Existencium?.Producto ? {  // <-- También Existencium (plural de Existencia)
        id: linea.Existencium.Producto.id,
        nombre: linea.Existencium.Producto.nombre
      } : null
    })) : []
  };
}

module.exports = remitoDTO;