/**
 * @typedef {Object} IDevolucionDTO
 * @property {number} id
 * @property {string} fecha
 * @property {string} razon
 * @property {number} repartoId
 * @property {{id:number, nombre:string, tercerizado:string, estado:string}|null} [Reparto]
 * @property {Array<{id:number, cantidad:number, existenciaId:number, devolucionId:number, Existencia:{id:number, cantidad:number, productoId:number, Producto:{id:number, nombre:string, peso:number}}}>} [LineaDevolucion]
 */
module.exports = {};