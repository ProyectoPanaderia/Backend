/**
 * @typedef {Object} ILineaRemitoDTO
 * @property {number} id
 * @property {number} cantidad
 * @property {number} subtotal
 * @property {number} remitoId
 * @property {number} existenciaId
 * @property {{id:number, total:number, fecha:string, clienteId:number|null, repartoId:number}|null} [Remito]
 * @property {{id:number, cantidad:number, fechaE:string, fechaV:string, productoId:number, repartoId:number, Producto:{id:number, nombre:string, peso:number}}|null} [Existencia]
 */
module.exports = {};