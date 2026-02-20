/**
 * @typedef {Object} IDevolucionDTO
 * @property {number} id
 * @property {string} fecha
 * @property {string} razon
 * @property {number} repartoId
 * @property {number} clienteId
 * @property {number} total
 * @property {{id:number, nombre:string, apellido:string, direccion:string} |null} [Cliente]
 * @property {{id:number, nombre:string, tercerizado:string, estado:string}|null} [Reparto]
 * @property {Array<{id:number, cantidad:number, existenciaId:number, devolucionId:number, Existencia:{id:number, cantidad:number, productoId:number, Producto:{id:number, nombre:string, peso:number}}}>} [LineaDevolucion]
 */
module.exports = {};