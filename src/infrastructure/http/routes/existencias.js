const { Router } = require('express');
const ExistenciaController = require('../../../interface/controllers/ExistenciaController');

module.exports = function existenciasRoutesFactory({ existenciaAppService }) {
  const router = Router();
  const controller = new ExistenciaController(existenciaAppService);

  // POST /existencias
  router.post('/', controller.crear);

  // GET /existencias
  router.get('/', controller.listar);

  // GET /existencias/:id
  router.get('/:id', controller.obtener);

  // PUT /existencias/:id
  router.put('/:id', controller.editar);

  // DELETE /existencias/:id
  router.delete('/:id', controller.eliminar);

  return router;
};