const lineaPedidoDTO = require('../LineaPedidoDTO/LineaPedidoDTO');
class PedidoDTO {
  constructor(data = {}) {
    // Si viene de Sequelize, usamos .get({ plain: true }) o la data directa
    const p = typeof data.get === 'function' ? data.get({ plain: true }) : data;

this.id = p.id;
    this.fechaEmision = p.fechaEmision;
    this.fechaEntrega = p.fechaEntrega;
    this.repartoId = p.repartoId;
    this.clienteId = p.clienteId;
    this.total = Number(p.total);
    this.estado = p.estado;

    // Expandimos relaciones para mostrar nombres en el front
    this.Cliente = p.Cliente ? {
        id: p.Cliente.id,
        nombre: p.Cliente.nombre,
        apellido: p.Cliente.apellido,
        direccion: p.Cliente.direccion
    } : null;

    this.Reparto = p.Reparto ? {
        id: p.Reparto.id,
        nombre: p.Reparto.nombre
    } : null;

    // Mapeamos las líneas usando el DTO correspondiente
    this.lineas = (p.LineaPedidos && Array.isArray(p.LineaPedidos))
        ? p.LineaPedidos.map(l => new lineaPedidoDTO(l))
        : [];
  }
}
module.exports = PedidoDTO;