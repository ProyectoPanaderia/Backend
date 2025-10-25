const { Router } = require('express');
const ClienteController = require('../../../interface/controllers/ClienteController');

module.exports = function clientesRoutesFactory({ clienteAppService }) {
  const router = Router();
  const controller = new ClienteController(clienteAppService);

  // POST /clientes
  router.post('/', controller.crear);

  // GET /clientes
  router.get('/', controller.listar);

  // GET /clientes/:id
  router.get('/:id', controller.obtener);

  // PUT /clientes/:id
  router.put('/:id', controller.editar);

  // DELETE /clientes/:id
  router.delete('/:id', controller.eliminar);

  return router;
};