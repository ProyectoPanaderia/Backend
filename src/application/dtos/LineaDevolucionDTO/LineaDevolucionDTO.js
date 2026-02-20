class LineaDevolucionDTO {
    /**
     * @param {{ id: number, productoId: number, descripcion: string, cantidad: number, precioUnitario: number, subtotal: number }} data
     */
    constructor(data = {}) {
        this.id = data.id;
        // Si en el backend usás existenciaId, acá podés mapearlo a productoId extrayéndolo de la relación si hace falta.
        this.productoId = data.productoId || (data.Existencia ? data.Existencia.productoId : null);
        this.descripcion = data.descripcion;
        this.cantidad = Number(data.cantidad);
        this.precioUnitario = Number(data.precioUnitario) || 0;
        this.subtotal = Number(data.subtotal) || 0;

        if (data.Existencia && data.Existencia.Producto) {
        this.descripcion = data.Existencia.Producto.nombre;
        }
    }
}

module.exports = LineaDevolucionDTO;