class PedidoDTO {
  constructor({ id, fechaEmision, fechaEntrega, total, estado, clienteId, repartoId, Cliente, Reparto, LineaPedidos } = {}) {
      this.id = id;
      this.fechaEmision = fechaEmision;
      this.fechaEntrega = fechaEntrega;
      this.total = Number(total) || 0;
      this.estado = estado;
      this.clienteId = clienteId;
      this.repartoId = repartoId;

      // Si viene el objeto Cliente (por un include), lo mapeamos simple
      this.cliente = Cliente ? {
          id: Cliente.id,
          nombre: Cliente.nombre,
          apellido: Cliente.apellido,
          direccion: Cliente.direccion // Opcional
      } : null;

      // Si viene el Reparto
      this.reparto = Reparto ? {
          id: Reparto.id,
          nombre: Reparto.nombre
      } : null;

      // Si vienen las líneas, las mapeamos para que el front reciba un array limpio
      this.lineas = (LineaPedidos && Array.isArray(LineaPedidos)) 
          ? LineaPedidos.map(linea => ({
              id: linea.id,
              productoId: linea.productoId,
              cantidad: linea.cantidad,
              precioUnitario: Number(linea.precioUnitario),
              subtotal: Number(linea.subtotal),
              descripcion: linea.descripcion
          })) 
          : [];
  }
}

module.exports = PedidoDTO;