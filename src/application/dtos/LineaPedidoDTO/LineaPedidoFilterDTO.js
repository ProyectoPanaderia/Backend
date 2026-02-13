class LineaPedidoFilterDTO {
    /**
     * @param {{ 
     * pedidoId?: any,
     * productoId?: any, 
     * minCantidad?: any,
     * descripcion?: any,
     * page?: any, 
     * pageSize?: any 
     * }} q
     */
    constructor(q = {}) {
        const { 
            pedidoId,
            productoId,
            minCantidad,
            descripcion,
            page = 1, 
            pageSize = 50 
        } = q;

        this.pedidoId = pedidoId ? Number(pedidoId) : undefined;
        this.productoId = productoId ? Number(productoId) : undefined;
        
        // Filtro por cantidad mínima
        this.minCantidad = minCantidad ? Number(minCantidad) : undefined;
        
        // Paginación
        this.page = Math.max(1, Number(page));
        this.pageSize = Math.min(100, Math.max(1, Number(pageSize)));
    }
}

module.exports = LineaPedidoFilterDTO;