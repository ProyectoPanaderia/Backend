/**
 * Mapea un objeto de dominio/Sequelize a DTO plano seguro
 * @param {{ id:number, nombre:string }|null} ciudad
 * @returns {import('./ICiudadDTO')|null}
 */
function ciudadDTO(ciudad) {
  if (!ciudad) return null;
  // Si viene instancia Sequelize:
  const row = typeof ciudad.get === 'function' ? ciudad.get({ plain: true }) : ciudad;
  return {
    id: row.id,
    nombre: row.nombre
  };
}

module.exports = ciudadDTO;