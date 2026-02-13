class LineaPedidoDTO {
    /**
     * @param {{ id: number, productoId: number, descripcion: string, cantidad: number, precioUnitario: number, subtotal: number }} data
     */
    constructor(data = {}) {
        this.id = data.id;
        this.productoId = data.productoId;
        this.descripcion = data.descripcion;
        this.cantidad = Number(data.cantidad);
        this.precioUnitario = Number(data.precioUnitario);
        this.subtotal = Number(data.subtotal);
    }
}

module.exports = LineaPedidoDTO;