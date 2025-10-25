/**
 * Mapea un objeto de dominio/Sequelize a DTO plano seguro.
 * Incluye el nombre de la ciudad si está disponible.
 * @param {{ id:number, nombre:string, ciudadId:number, Ciudad?:{nombre:string} }|null} cliente
 * @returns {import('./IClienteDTO')|null}
 */
function clienteDTO(cliente) {
  if (!cliente) return null;
  const row = typeof cliente.get === 'function' ? cliente.get({ plain: true }) : cliente;

  return {
    id: row.id,
    nombre: row.nombre,
    ciudadId: row.ciudadId,
    ciudadNombre: row.Ciudad ? row.Ciudad.nombre : null
  };
}

module.exports = clienteDTO;