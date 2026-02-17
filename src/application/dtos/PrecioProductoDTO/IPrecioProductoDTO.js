/**
 * @typedef {Object} IPrecioProductoDTO
 * @property {number} id
 * @property {string} nombre - Tipo de precio (reventa, consumidor final, etc.)
 * @property {number} valor - Precio del producto
 * @property {string} fecha - Fecha de vigencia (YYYY-MM-DD)
 * @property {number} productoId
 * @property {Object|null} producto - Relación con Producto
 * @property {number} producto.id
 * @property {string} producto.nombre
 * @property {number} producto.peso
 */

module.exports = {};