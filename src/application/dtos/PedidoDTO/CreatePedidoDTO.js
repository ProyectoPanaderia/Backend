const CreateLineaPedidoDTO = require('../LineaPedidoDTO/CreateLineaPedidoDTO');
class CreatePedidoDTO {
    /**
     * @param {{ fechaEmision:any, fechaEntrega:any, repartoId: any, clienteId: any, estado: any, total: any, lineas: any[]}} param0
     */
    constructor({ fechaEmision, fechaEntrega, repartoId, clienteId, estado, lineas } = {}) {

        const fechaEmi = fechaEmision ? new Date(fechaEmision) : new Date();
        if (isNaN(fechaEmi.getTime())) throw new Error('fechaEmision inválida');

        if (!fechaEntrega) throw new Error('fechaEntrega es obligatoria');
        const fechaEnt = new Date(fechaEntrega);
        if (isNaN(fechaEnt.getTime())) throw new Error('fechaEntrega inválida');
        
        if (fechaEnt < fechaEmi)
            throw new Error('fechaEntrega debe ser igual o posterior a fechaEmision');

        const rId = Number(repartoId);
        if (isNaN(rId) || rId <= 0) {
            console.error("DEBUG DTO - Valor recibido de repartoId:", repartoId);
            throw new Error('repartoId inválido');
        }
        
        if (!clienteId || isNaN(Number(clienteId)) || Number(clienteId) <= 0)
            throw new Error('clienteId inválido');

        if (!lineas || !Array.isArray(lineas) || lineas.length === 0) {
            throw new Error('El pedido debe tener al menos un producto');
        }

        this.fechaEmision = fechaEmi;
        this.fechaEntrega = fechaEnt;
        this.repartoId = rId;
        this.clienteId = Number(clienteId);
        this.estado = estado || 'Pendiente';

        this.lineas = lineas.map(l => new CreateLineaPedidoDTO(l));

        // Calculamos el total sumando los subtotales
        this.total = this.lineas.reduce((acc, curr) => acc + curr.subtotal, 0);
    }
}
module.exports = CreatePedidoDTO;