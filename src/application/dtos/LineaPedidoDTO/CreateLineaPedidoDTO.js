class CreateLineaPedidoDTO {
    /**
     * @param {{ productoId: any, cantidad: any, precioUnitario: any, descripcion: any, notas?: any }} param0
     */
    constructor({ productoId, cantidad, precioUnitario, descripcion, notas } = {}) {
        
        if (!productoId || isNaN(Number(productoId)) || Number(productoId) <= 0)
            throw new Error('Línea de pedido: productoId inválido');

        if (!cantidad || isNaN(Number(cantidad)) || Number(cantidad) <= 0)
            throw new Error('Línea de pedido: cantidad inválida');

        // Aceptamos precio 0 si es una bonificación, pero no null o negativo
        if (precioUnitario === undefined || precioUnitario === null || isNaN(Number(precioUnitario)) || Number(precioUnitario) < 0)
            throw new Error('Línea de pedido: precioUnitario inválido');

        if (!descripcion || typeof descripcion !== 'string' || !descripcion.trim())
            throw new Error(`Línea de pedido: falta la descripción para el producto ID ${productoId}`);

        this.productoId = Number(productoId);
        this.cantidad = Number(cantidad);
        this.precioUnitario = Number(precioUnitario);
        
        // Calculamos el subtotal acá
        this.subtotal = this.cantidad * this.precioUnitario;
        
        this.descripcion = descripcion.trim();
        this.notas = notas ? String(notas).trim() : null;
    }
}

module.exports = CreateLineaPedidoDTO;