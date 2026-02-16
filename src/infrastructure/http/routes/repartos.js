const { Router } = require('express');
const RepartoController = require('../../../interface/controllers/RepartoController');

module.exports = function repartosRoutesFactory({ repartoAppService }) {
  const router = Router();
  const controller = new RepartoController(repartoAppService);

  router.post('/', controller.crear);
  router.get('/', controller.listar);
  router.get('/:id', controller.obtener);
  router.put('/:id', controller.editar);
  router.delete('/:id', controller.eliminar);

  // GET /repartos/:repartoId/devoluciones - Obtener todas las devoluciones de un reparto
  router.get('/:repartoId/devoluciones', controller.obtenerPorReparto);

  return router;
};