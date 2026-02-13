const { Router } = require('express');
const LineaPedidoController = require('../../../interface/controllers/LineaPedidoController');

module.exports = function lineaPedidosRoutesFactory({ lineaPedidoAppService }) {
  const router = Router();
  const controller = new LineaPedidoController(lineaPedidoAppService);

  // POST /linea-pedidos
  router.post('/', controller.crear);

  // GET /linea-pedidos
  router.get('/', controller.listar);

  // GET /linea-pedidos/:id
  router.get('/:id', controller.obtener);

  // PATCH /linea-pedidos/:id (Ideal para cambiar solo cantidad o precio)
  router.patch('/:id', controller.editar);

  // DELETE /linea-pedidos/:id
  router.delete('/:id', controller.eliminar);

  return router;
};