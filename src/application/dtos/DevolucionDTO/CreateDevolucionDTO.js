const CreateLineaDevolucionDTO = require('../LineaDevolucionDTO/CreateLineaDevolucionDTO.js');

class CreateDevolucionDTO {
    /**
     * @param {{ fecha:any, razon:any, repartoId: any, clienteId: any, lineas: any[]}} param0
     */
    constructor({ fecha, razon, repartoId, clienteId, lineas } = {}) {

        // 1. Validar Fecha
        const fechaDev = fecha ? new Date(fecha) : new Date();
        if (isNaN(fechaDev.getTime())) throw new Error('Fecha inválida');

        // 2. Validar Razón
        if (!razon || String(razon).trim() === '') {
            throw new Error('La razón (motivo) de la devolución es obligatoria');
        }

        // 3. Validar Reparto
        const rId = Number(repartoId);
        if (isNaN(rId) || rId <= 0) {
            throw new Error('repartoId inválido');
        }
        
        // 4. Validar Cliente
        const cId = Number(clienteId);
        if (isNaN(cId) || cId <= 0) {
            throw new Error('clienteId inválido');
        }

        // 5. Validar Líneas
        if (!lineas || !Array.isArray(lineas) || lineas.length === 0) {
            throw new Error('La devolución debe tener al menos un producto');
        }

        this.fecha = fechaDev;
        this.razon = String(razon).trim();
        this.repartoId = rId;
        this.clienteId = cId;

        // Mapeamos las líneas y validamos cada una con su propio DTO
        this.lineas = lineas.map(l => new CreateLineaDevolucionDTO(l));

        // Calculamos el total de la devolución sumando los subtotales de las líneas
        this.total = this.lineas.reduce((acc, curr) => acc + curr.subtotal, 0);
    }
}
module.exports = CreateDevolucionDTO;