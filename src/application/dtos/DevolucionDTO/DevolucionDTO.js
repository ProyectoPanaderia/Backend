/**
 * Mapea un objeto de dominio/Sequelize a DTO plano seguro
 * @param {any} devolucion - Instancia Sequelize o objeto plano
 * @returns {any|null}
 */
function devolucionDTO(devolucion) {
  if (!devolucion) return null;

  // Si viene una instancia Sequelize, convertir a objeto plano
  const row = typeof devolucion.get === 'function' ? devolucion.get({ plain: true }) : devolucion;

  return {
    id: row.id,
    fecha: row.fecha,
    razon: row.razon,
    repartoId: row.repartoId,
    
    // Relaciones (si el Include de Sequelize las trajo)
    Reparto: row.Reparto ? {
      id: row.Reparto.id,
      nombre: row.Reparto.nombre,
      tercerizado: row.Reparto.tercerizado,
      estado: row.Reparto.estado
    } : null,
    
    // LineaDevolucion si existen detalles
    LineaDevolucion: row.LineaDevolucion ? row.LineaDevolucion.map(linea => ({
      id: linea.id,
      cantidad: linea.cantidad,
      existenciaId: linea.existenciaId,
      devolucionId: linea.devolucionId,
      Existencia: linea.Existencia ? {
        id: linea.Existencia.id,
        cantidad: linea.Existencia.cantidad,
        productoId: linea.Existencia.productoId,
        Producto: linea.Existencia.Producto ? {
          id: linea.Existencia.Producto.id,
          nombre: linea.Existencia.Producto.nombre,
          peso: linea.Existencia.Producto.peso
        } : null
      } : null
    })) : []
  };
}

module.exports = devolucionDTO;