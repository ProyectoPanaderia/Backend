/**
 * @typedef {Object} IRemitoDTO
 * @property {number} id
 * @property {number} total
 * @property {string} fecha
 * @property {number|null} clienteId
 * @property {number} repartoId
 * @property {{id:number, nombre:string, ciudadId:number}|null} [Cliente]
 * @property {{id:number, nombre:string, tercerizado:string, estado:string}|null} [Reparto]
 * @property {Array<{id:number, cantidad:number, subtotal:number, existenciaId:number}>} [LineasRemito]
 */
module.exports = {};