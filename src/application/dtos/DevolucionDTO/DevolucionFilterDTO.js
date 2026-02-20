class DevolucionFilterDTO {
    /**
     * @param {{ fechaDesde?: any, fechaHasta?: any, repartoId?: any, clienteId?: any, razon?: any, page?: any, pageSize?: any, orderBy?: any, orderDir?: any }} q
     */
    constructor(q = {}) {
        const { 
            fechaDesde, 
            fechaHasta, 
            repartoId,
            clienteId,
            razon,
            page = 1, 
            pageSize = 20, 
            orderBy = 'fecha', 
            orderDir = 'DESC'         
        } = q;

        this.fechaDesde = fechaDesde ? String(fechaDesde) : undefined;
        this.fechaHasta = fechaHasta ? String(fechaHasta) : undefined;
        this.repartoId = repartoId != null ? Number(repartoId) : undefined;
        this.clienteId = clienteId != null ? Number(clienteId) : undefined;
        this.razon = razon ? String(razon) : undefined;

        this.page = Math.max(1, Number(page));
        this.pageSize = Math.min(100, Math.max(1, Number(pageSize)));

        const validOrder = ['id', 'fecha', 'repartoId', 'clienteId', 'total'];
        this.orderBy = validOrder.includes(orderBy) ? orderBy : 'fecha';
        
        this.orderDir = String(orderDir).toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    }
}
module.exports = DevolucionFilterDTO;