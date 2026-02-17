/**
 * Mapea un objeto de dominio/Sequelize a DTO plano seguro
 * @param {any} precio - Instancia Sequelize o objeto plano
 * @returns {object|null}
 */
function precioProductoDTO(precio) {
  if (!precio) return null;
  
  const row = typeof precio.get === 'function' ? precio.get({ plain: true }) : precio;
  
  return {
    id: row.id,
    nombre: row.nombre,
    valor: row.valor,
    fecha: row.fecha,
    productoId: row.productoId,
    
    // Relación con Producto (si el Include de Sequelize la trajo)
    producto: row.Producto ? {
      id: row.Producto.id,
      nombre: row.Producto.nombre,
      peso: row.Producto.peso
    } : null
  };
}

module.exports = precioProductoDTO;