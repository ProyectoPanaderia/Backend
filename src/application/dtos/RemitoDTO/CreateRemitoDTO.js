class CreateRemitoDTO {
  /**
   * @param {{ total: any, fecha: any, clienteId?: any, repartoId: any, lineas: any, pedidoOrigenId?: any }} param0
   */
  constructor({ total, fecha, clienteId, repartoId, lineas, pedidoOrigenId }) {
    
    // Validar total
    if (total === undefined || total === null || isNaN(Number(total)) || Number(total) < 0) {
      throw new Error('total requerido y debe ser un número mayor o igual a 0');
    }

    // Validar fecha
    if (!fecha || typeof fecha !== 'string') {
      throw new Error('fecha requerida y debe ser válida (YYYY-MM-DD)');
    }

    // Validar repartoId
    if (!repartoId || isNaN(Number(repartoId))) {
      throw new Error('repartoId requerido y debe ser numérico');
    }

    // clienteId es opcional
    if (clienteId && isNaN(Number(clienteId))) {
      throw new Error('clienteId debe ser numérico si se proporciona');
    }

    if (!lineas || !Array.isArray(lineas) || lineas.length === 0) {
      throw new Error('Se requiere al menos una línea para el remito');
    }

    this.total = Number(total);
    this.fecha = fecha;
    this.clienteId = clienteId ? Number(clienteId) : null;
    this.repartoId = Number(repartoId);

    this.pedidoOrigenId = pedidoOrigenId && !isNaN(Number(pedidoOrigenId)) 
                          ? Number(pedidoOrigenId) 
                          : null;

    this.lineas = lineas.map(l => {
      if (!l.productoId || isNaN(Number(l.productoId))) throw new Error('productoId requerido en cada línea');
      if (!l.cantidad || isNaN(Number(l.cantidad)) || Number(l.cantidad) <= 0) throw new Error('cantidad requerida y mayor a 0 en cada línea');
      if (l.subtotal === undefined || isNaN(Number(l.subtotal))) throw new Error('subtotal requerido en cada línea');
      return {
        productoId: Number(l.productoId),
        cantidad: Number(l.cantidad),
        subtotal: Number(l.subtotal),
        precioUnitario: l.precioUnitario ? Number(l.precioUnitario) : (Number(l.subtotal) / Number(l.cantidad))
      };
    });
  }
}
module.exports = CreateRemitoDTO;