/**
 * Mapea un objeto de dominio/Sequelize a DTO plano seguro
 * @param {{ id:number, nombre:string, tercerizado:string, estado:string }|null} rep
 * @returns {import('./IRepartoDTO')|null}
 */
function repartoDTO(rep) {
  if (!rep) return null;

  // Si viene una instancia Sequelize:
  const row = typeof rep.get === 'function' ? rep.get({ plain: true }) : rep;

  return {
    id: row.id,
    nombre: row.nombre,
    tercerizado: row.tercerizado,
    estado: row.estado,
  };
}

module.exports = repartoDTO;