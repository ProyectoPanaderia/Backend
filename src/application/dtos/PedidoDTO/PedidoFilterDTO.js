class PedidoFilterDTO {
    /**
     * @param {{ 
     * fechaEmisionDesde?: any, 
     * fechaEmisionHasta?: any, 
     * fechaEntregaDesde?: any, 
     * fechaEntregaHasta?: any, 
     * repartoId?: any, 
     * clienteId?: any,
     * page?: any, 
     * pageSize?: any, 
     * orderBy?: any, 
     * orderDir?: any 
     * }} q
     */
    constructor(q = {}) {
        const { 
            fechaEmisionDesde, 
            fechaEmisionHasta, 
            fechaEntregaDesde, 
            fechaEntregaHasta, 
            repartoId,
            clienteId,
            estado,
            page = 1, 
            pageSize = 20, 
            orderBy = 'fechaEmision', 
            orderDir = 'DESC'         
        } = q;

        this.fechaEmisionDesde = fechaEmisionDesde ? String(fechaEmisionDesde) : undefined;
        this.fechaEmisionHasta = fechaEmisionHasta ? String(fechaEmisionHasta) : undefined;
        
        this.fechaEntregaDesde = fechaEntregaDesde ? String(fechaEntregaDesde) : undefined;
        this.fechaEntregaHasta = fechaEntregaHasta ? String(fechaEntregaHasta) : undefined;

        this.repartoId = repartoId != null ? Number(repartoId) : undefined;

        this.clienteId = clienteId != null ? Number(clienteId) : undefined;

        this.estado = estado ? String(estado) : undefined;

        this.page = Math.max(1, Number(page));
        this.pageSize = Math.min(100, Math.max(1, Number(pageSize)));

        const validOrder = ['id', 'fechaEmision', 'fechaEntrega', 'repartoId', 'clienteId', 'total', 'estado'];
        this.orderBy = validOrder.includes(orderBy) ? orderBy : 'fechaEmision';
        
        this.orderDir = String(orderDir).toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    }
}

module.exports = PedidoFilterDTO;