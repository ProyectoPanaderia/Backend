const { Router } = require('express');
const VehiculoController = require('../../../interface/controllers/VehiculoController');

module.exports = function vehiculosRoutesFactory({ vehiculoAppService }) {
  const router = Router();
  const controller = new VehiculoController(vehiculoAppService);

  router.post('/', controller.crear);
  router.get('/', controller.listar);
  router.get('/:id', controller.obtener);
  router.put('/:id', controller.editar);
  router.delete('/:id', controller.eliminar);

  return router;
};