const { Router } = require('express');
const LineaDevolucionController = require('../../../interface/controllers/LineaDevolucionController');
const { verificarToken } = require('../middleware/authMiddleware'); // Ajustá la ruta de tu middleware

module.exports = function lineasDevolucionRoutesFactory({ lineaDevolucionAppService }) {
  const router = Router();
  const controller = new LineaDevolucionController(lineaDevolucionAppService);

  // Protegemos también las líneas para que nadie edite plata sin permisos
  router.use(verificarToken);

  // POST /api/lineas-devolucion
  router.post('/', controller.crear);

  // GET /api/lineas-devolucion
  router.get('/', controller.listar);

  // GET /api/lineas-devolucion/:id
  router.get('/:id', controller.obtener);

  // PATCH /api/lineas-devolucion/:id (Ideal para corregir cantidad o precio)
  router.patch('/:id', controller.editar);

  // DELETE /api/lineas-devolucion/:id
  router.delete('/:id', controller.eliminar);

  return router;
};