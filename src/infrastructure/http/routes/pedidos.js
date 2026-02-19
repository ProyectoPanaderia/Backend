const { Router } = require('express');
const PedidoController = require('../../../interface/controllers/PedidoController');

module.exports = function pedidosRoutesFactory({ pedidoAppService }) {
  const router = Router();
  const controller = new PedidoController(pedidoAppService);

  router.get('/ultimo/:clienteId', controller.obtenerUltimoPorCliente);
  
  // POST /pedidos
  router.post('/', controller.crear);

  // GET /pedidos
  router.get('/', controller.listar);

  // GET /pedidos/:id
  router.get('/:id', controller.obtener);

  // PATCH /pedidos/:id (Usamos PATCH porque actualizamos parcialmente)
  router.patch('/:id', controller.editar);

  // PATCH /pedidos/:id/estado (Ruta específica para flujo de trabajo)
  router.patch('/:id/estado', controller.cambiarEstado);

  // DELETE /pedidos/:id
  router.delete('/:id', controller.eliminar);

  return router;
};