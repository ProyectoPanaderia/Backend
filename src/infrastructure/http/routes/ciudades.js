const { Router } = require('express');
const CiudadController = require('../../../interface/controllers/CiudadController');

module.exports = function ciudadesRoutesFactory({ ciudadAppService }) {
  const router = Router();
  const controller = new CiudadController(ciudadAppService);

  // POST /ciudades
  router.post('/', controller.crear);

  // GET /ciudades
  router.get('/', controller.listar);

  // GET /ciudades/:id
  router.get('/:id', controller.obtener);

  // PUT /ciudades/:id
  router.put('/:id', controller.editar);

  // DELETE /ciudades/:id
  router.delete('/:id', controller.eliminar);

  return router;
};