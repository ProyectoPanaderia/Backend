const { Router } = require('express');
const DevolucionController = require('../../../interface/controllers/DevolucionController');
const { verificarToken } = require('../middleware/authMiddleware'); // Ajustá la ruta de tu middleware

module.exports = function devolucionesRoutesFactory({ devolucionAppService }) {
  const router = Router();
  const controller = new DevolucionController(devolucionAppService);

  // Protegemos todas las rutas de devoluciones
  router.use(verificarToken);

  // POST /api/devoluciones
  router.post('/', controller.crear);

  // GET /api/devoluciones
  router.get('/', controller.listar);

  // GET /api/devoluciones/:id
  router.get('/:id', controller.obtener);

  // PATCH /api/devoluciones/:id
  router.patch('/:id', controller.editar);

  // DELETE /api/devoluciones/:id
  router.delete('/:id', controller.eliminar);

  return router;
};