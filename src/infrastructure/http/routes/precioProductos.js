const { Router } = require('express');
const PrecioProductoController = require('../../../interface/controllers/PrecioProductoController');

module.exports = function precioProductos({ precioProductoAppService }) {
  const router = Router();
  const controller = new PrecioProductoController(precioProductoAppService);

  // GET /precio-productos/vigente/:productoId - ANTES del :id para evitar conflictos
  router.get('/vigente/:productoId', controller.obtenerVigente);

  // POST /precio-productos
  router.post('/', controller.crear);

  // GET /precio-productos
  router.get('/', controller.listar);

  // GET /precio-productos/:id
  router.get('/:id', controller.obtener);

  // PUT /precio-productos/:id
  router.put('/:id', controller.editar);

  // DELETE /precio-productos/:id
  router.delete('/:id', controller.eliminar);

  return router;
};