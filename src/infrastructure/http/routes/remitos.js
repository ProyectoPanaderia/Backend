const { Router } = require('express');
const RemitoController = require('../../../interface/controllers/RemitoController');

module.exports = function remitosRoutesFactory({ remitoAppService }) {
  const router = Router();
  const controller = new RemitoController(remitoAppService);

  // GET /remitos/reportes/totales - ANTES del :id para evitar conflictos
  router.get('/reportes/totales', controller.obtenerTotalVentas);

  // POST /remitos - Crear nuevo remito
  router.post('/', controller.crear);

  // GET /remitos - Listar remitos
  router.get('/', controller.listar);

  // GET /remitos/:id - Obtener remito por ID
  router.get('/:id', controller.obtener);

  // PUT /remitos/:id - Actualizar remito
  router.put('/:id', controller.editar);

  // DELETE /remitos/:id - Eliminar remito
  router.delete('/:id', controller.eliminar);

  // GET /remitos/:remitoId/lineas - Obtener todas las líneas de un remito
  router.get('/:remitoId/lineas', controller.obtenerPorRemito);

  // GET /remitos/:remitoId/total - Calcular total de un remito
  router.get('/:remitoId/total', controller.calcularTotalRemito);

  return router;
};