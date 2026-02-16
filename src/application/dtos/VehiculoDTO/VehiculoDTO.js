/**
 * Mapea un objeto de dominio/Sequelize a DTO plano seguro
 * @param {any} vehiculo - Instancia Sequelize o objeto plano
 * @returns {any|null}
 */
function vehiculoDTO(vehiculo) {
  if (!vehiculo) return null;

  const row = typeof vehiculo.get === 'function' ? vehiculo.get({ plain: true }) : vehiculo;

  return {
    id: row.id,
    patente: row.patente,
    modelo: row.modelo,
    capacidad: row.capacidad,
    repartoId: row.repartoId,
    
    Reparto: row.Reparto ? {
      id: row.Reparto.id,
      nombre: row.Reparto.nombre,
      tercerizado: row.Reparto.tercerizado,
      estado: row.Reparto.estado
    } : null
  };
}

module.exports = vehiculoDTO;