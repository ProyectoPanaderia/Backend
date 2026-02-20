class LineaDevolucionFilterDTO {
    /**
     * @param {{ 
     * devolucionId?: any,
     * productoId?: any, 
     * minCantidad?: any,
     * descripcion?: any,
     * page?: any, 
     * pageSize?: any 
     * }} q
     */
    constructor(q = {}) {
        const { 
            devolucionId,
            productoId,
            minCantidad,
            descripcion,
            page = 1, 
            pageSize = 50 
        } = q;

        this.devolucionId = devolucionId ? Number(devolucionId) : undefined;
        this.productoId = productoId ? Number(productoId) : undefined;
        
        this.minCantidad = minCantidad ? Number(minCantidad) : undefined;
        this.descripcion = descripcion ? String(descripcion).trim() : undefined;
        
        this.page = Math.max(1, Number(page));
        this.pageSize = Math.min(100, Math.max(1, Number(pageSize)));
    }
}

module.exports = LineaDevolucionFilterDTO;