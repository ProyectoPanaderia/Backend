const LineaDevolucionDTO = require('../LineaDevolucionDTO/LineaDevolucionDTO');

class DevolucionDTO {
  constructor(data = {}) {
    // Si viene de Sequelize, usamos .get({ plain: true }) o la data directa
    const d = typeof data.get === 'function' ? data.get({ plain: true }) : data;

    this.id = d.id;
    this.fecha = d.fecha;
    this.razon = d.razon;
    this.total = Number(d.total) || 0;
    this.repartoId = d.repartoId;
    this.clienteId = d.clienteId;

    // Expandimos relaciones para mostrar nombres en el front
    this.Cliente = d.Cliente ? {
        id: d.Cliente.id,
        nombre: d.Cliente.nombre,
        apellido: d.Cliente.apellido,
        direccion: d.Cliente.direccion
    } : null;

    this.Reparto = d.Reparto ? {
        id: d.Reparto.id,
        nombre: d.Reparto.nombre
    } : null;

    // Mapeamos las líneas usando el DTO correspondiente
    this.lineas = (d.LineaDevolucions && Array.isArray(d.LineaDevolucions))
        ? d.LineaDevolucions.map(l => new LineaDevolucionDTO(l))
        : [];
  }
}
module.exports = DevolucionDTO;