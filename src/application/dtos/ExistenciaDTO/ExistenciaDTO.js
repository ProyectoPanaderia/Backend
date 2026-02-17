/**
 * Mapea un objeto de dominio/Sequelize a DTO plano seguro
 * @param {any} ex - Instancia Sequelize o objeto plano
 * @returns {import('./IExistenciaDTO')|null}
 */
function existenciaDTO(ex) {
  if (!ex) return null;
  const row = typeof ex.get === 'function' ? ex.get({ plain: true }) : ex;
  return {
    id: row.id,
    cantidad: row.cantidad,
    fechaE: row.fechaE,
    fechaV: row.fechaV,
    productoId: row.productoId,
    repartoId: row.repartoId,
    
    // Cambiar a minúscula para seguir convenciones JS
    producto: row.Producto ? {
      id: row.Producto.id,
      nombre: row.Producto.nombre,
      peso: row.Producto.peso
    } : null,
    
    reparto: row.Reparto ? {
      id: row.Reparto.id,
      nombre: row.Reparto.nombre
    } : null
  };
}
module.exports = existenciaDTO;
