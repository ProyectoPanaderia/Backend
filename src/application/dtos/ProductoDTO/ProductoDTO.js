/**
 * Mapea un objeto de dominio/Sequelize a DTO plano seguro
 * @param {{ id:number, nombre:string, peso:number }|null} prod
 * @returns {import('./IProductoDTO')|null}
 */
function productoDTO(prod) {
  if (!prod) return null;
  // Si viene instancia Sequelize:
  const row = typeof prod.get === 'function' ? prod.get({ plain: true }) : prod;
  return {
    id: row.id,
    nombre: row.nombre,
    peso: row.peso
  };
}

module.exports = productoDTO;