const { Router } = require('express');
const LineaRemitoController = require('../../../interface/controllers/LineaRemitoController');

module.exports = function lineasRemitoRoutesFactory({ lineaRemitoAppService }) {
  const router = Router();
  const controller = new LineaRemitoController(lineaRemitoAppService);

  // POST /lineas-remito - Crear nueva línea
  router.post('/', controller.crear);

  // GET /lineas-remito - Listar líneas
  router.get('/', controller.listar);

  // GET /lineas-remito/:id - Obtener línea por ID
  router.get('/:id', controller.obtener);

  // PUT /lineas-remito/:id - Actualizar línea
  router.put('/:id', controller.editar);

  // DELETE /lineas-remito/:id - Eliminar línea
  router.delete('/:id', controller.eliminar);

  return router;
};