const { Router } = require('express');
const EmpleadoController = require('../../../interface/controllers/EmpleadoController');

module.exports = function empleadosRoutesFactory({ empleadoAppService }) {
  const router = Router();
  const controller = new EmpleadoController(empleadoAppService);

  // Rutas estándar de CRUD
  router.post('/', controller.crear);
  router.get('/', controller.listar);
  router.get('/:id', controller.obtener);
  router.put('/:id', controller.editar);
  router.delete('/:id', controller.eliminar);
  
  // Filtrar por reparto
  router.get('/reparto/:repartoId', controller.obtenerPorReparto);

  // Obtener los datos del empleado (y su repartoId) al loguearse
  router.get('/usuario/:usuarioId', controller.obtenerPorUsuario);

  return router;
};