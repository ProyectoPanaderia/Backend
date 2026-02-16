const { Router } = require('express');
const DevolucionController = require('../../../interface/controllers/DevolucionController');

module.exports = function devolucionsRoutesFactory({ devolucionAppService }) {
  const router = Router();
  const controller = new DevolucionController(devolucionAppService);

  // GET /devoluciones/estadisticas/resumen - ANTES del :id para evitar conflictos
  router.get('/estadisticas/resumen', controller.obtenerEstadisticas);

  // POST /devoluciones - Crear nueva devolución
  router.post('/', controller.crear);

  // GET /devoluciones - Listar devoluciones
  router.get('/', controller.listar);

  // GET /devoluciones/:id - Obtener devolución por ID
  router.get('/:id', controller.obtener);

  // PUT /devoluciones/:id - Actualizar devolución
  router.put('/:id', controller.editar);

  // DELETE /devoluciones/:id - Eliminar devolución
  router.delete('/:id', controller.eliminar);

  return router;
};