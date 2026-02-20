class UpdateLineaDevolucionDTO {
    /**
     * @param {{ cantidad?: any, precioUnitario?: any, descripcion?: any, notas?: any }} param0
     */
    constructor({ cantidad, precioUnitario, descripcion, notas } = {}) {
        
        if (cantidad !== undefined) {
            const cant = Number(cantidad);
            if (isNaN(cant) || cant <= 0) throw new Error('UpdateLineaDevolucion: cantidad inválida');
            this.cantidad = cant;
        }

        if (precioUnitario !== undefined) {
            const precio = Number(precioUnitario);
            if (isNaN(precio) || precio < 0) throw new Error('UpdateLineaDevolucion: precioUnitario inválido');
            this.precioUnitario = precio;
        }

        if (descripcion !== undefined) {
            if (typeof descripcion !== 'string' || !descripcion.trim()) {
                throw new Error('UpdateLineaDevolucion: descripcion inválida');
            }
            this.descripcion = descripcion.trim();
        }

        if (notas !== undefined) {
            this.notas = String(notas).trim();
        }

        if (
            this.cantidad === undefined &&
            this.precioUnitario === undefined &&
            this.descripcion === undefined &&
            this.notas === undefined
        ) {
            throw new Error('Sin datos para actualizar la línea de devolución');
        }
    }
}

module.exports = UpdateLineaDevolucionDTO;