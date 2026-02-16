const { Router } = require('express');
const EmpleadoController = require('../../../interface/controllers/EmpleadoController');

module.exports = function empleadosRoutesFactory({ empleadoAppService }) {
  const router = Router();
  const controller = new EmpleadoController(empleadoAppService);

  router.post('/', controller.crear);
  router.get('/', controller.listar);
  router.get('/:id', controller.obtener);
  router.put('/:id', controller.editar);
  router.delete('/:id', controller.eliminar);

  return router;
};