class UpdateLineaPedidoDTO {
    /**
     * @param {{ cantidad?: any, precioUnitario?: any, descripcion?: any, notas?: any }} param0
     */
    constructor({ cantidad, precioUnitario, descripcion, notas } = {}) {
        
        if (cantidad !== undefined) {
            const cant = Number(cantidad);
            if (isNaN(cant) || cant <= 0) throw new Error('UpdateLinea: cantidad inválida');
            this.cantidad = cant;
        }

        if (precioUnitario !== undefined) {
            const precio = Number(precioUnitario);
            if (isNaN(precio) || precio < 0) throw new Error('UpdateLinea: precioUnitario inválido');
            this.precioUnitario = precio;
        }

        if (descripcion !== undefined) {
            if (typeof descripcion !== 'string' || !descripcion.trim()) {
                throw new Error('UpdateLinea: descripcion inválida');
            }
            this.descripcion = descripcion.trim();
        }

        // Si se actualizan cantidad o precio, recalculamos subtotal automáticamente en el servicio,
        // pero aquí solo validamos los inputs.

        // Validamos que venga algo por lo menos
        if (
            this.cantidad === undefined &&
            this.precioUnitario === undefined &&
            this.descripcion === undefined &&
            this.notas === undefined
        ) {
            throw new Error('Sin datos para actualizar');
        }
    }
}

module.exports = UpdateLineaPedidoDTO;