const { Router } = require('express');
const ProductoController = require('../../../interface/controllers/ProductoController');


module.exports = function productosRoutesFactory({ productoAppService }) {
  const router = Router();
  const controller = new ProductoController(productoAppService);

  // POST /productos
  router.post('/', controller.crear);

  // GET /productos
  router.get('/', controller.listar);

  // GET /productos/:id
  router.get('/:id', controller.obtener);

  // PUT /productos/:id
  router.put('/:id', controller.editar);

  // DELETE /productos/:id
  router.delete('/:id', controller.eliminar);

  return router;
};
