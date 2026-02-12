class CreatePedidoDTO {
    /**
     * @param {{ fechaEmision:any, fechaEntrega:any, repartoId: any}} param0
     */
    constructor({ fechaEmision, fechaEntrega, repartoId }) {
        if (!fechaEmision || isNaN(Date.parse(fechaEmision)))
            throw new Error('fechaEmision inválida');
        if (!fechaEntrega || isNaN(Date.parse(fechaEntrega)))
            throw new Error('fechaEntrega inválida');
        const fechaEmi = new Date(fechaEmision);
        const fechaEnt = new Date(fechaEntrega);
        if (fechaEnt < fechaEmi)
            throw new Error('fechaEntrega debe ser igual o posterior a fechaEmision');
        if (!repartoId || isNaN(Number(repartoId)) || Number(repartoId) <= 0)
            throw new Error('repartoId inválido');
        this.fechaEmision = fechaEmi;
        this.fechaEntrega = fechaEnt;
        this.repartoId = Number(repartoId);
    }

}
module.exports = CreatePedidoDTO;