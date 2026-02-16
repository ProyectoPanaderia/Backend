/**
 * Mapea un objeto de dominio/Sequelize a DTO plano seguro
 * @param {any} empleado - Instancia Sequelize o objeto plano
 * @returns {any|null}
 */
function empleadoDTO(empleado) {
  if (!empleado) return null;

  const row = typeof empleado.get === 'function' ? empleado.get({ plain: true }) : empleado;

  return {
    id: row.id,
    nombre: row.nombre,
    apellido: row.apellido,
    email: row.email,
    telefono: row.telefono,
    repartoId: row.repartoId,
    
    Reparto: row.Reparto ? {
      id: row.Reparto.id,
      nombre: row.Reparto.nombre,
      tercerizado: row.Reparto.tercerizado,
      estado: row.Reparto.estado
    } : null
  };
}

module.exports = empleadoDTO;