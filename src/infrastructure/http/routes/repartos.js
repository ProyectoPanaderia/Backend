const { Router } = require('express');
const RepartoController = require('../../../interface/controllers/RepartoController');

// 1. Importamos los middlewares de seguridad (ajusta la ruta según dónde los guardaste)
const { verificarToken, verificarRol } = require('../middleware/authMiddleware');
module.exports = function repartosRoutesFactory({ repartoAppService }) {
  const router = Router();
  const controller = new RepartoController(repartoAppService);

  // 2. Protegemos TODAS las rutas de este archivo exigiendo que haya iniciado sesión
  router.use(verificarToken);

  // 3. Definimos los permisos exactos ruta por ruta:

  // Solo los administradores pueden crear repartos
  router.post('/', verificarRol(['SUPERADMIN', 'ADMINISTRADOR']), controller.crear);
  
  // Todos pueden listar y ver (Recuerda que en el Controller/Service filtraremos 
  // para que el REPARTIDOR solo vea los suyos usando req.usuario.repartoId)
  router.get('/', verificarRol(['SUPERADMIN', 'ADMINISTRADOR', 'REPARTIDOR']), controller.listar);
  router.get('/:id', verificarRol(['SUPERADMIN', 'ADMINISTRADOR', 'REPARTIDOR']), controller.obtener);
  
  // Solo los administradores pueden editar datos generales del reparto
  router.put('/:id', verificarRol(['SUPERADMIN', 'ADMINISTRADOR']), controller.editar);
  
  // Acciones destructivas solo para el nivel más alto
  router.delete('/:id', verificarRol(['SUPERADMIN']), controller.eliminar);

  // GET /repartos/:repartoId/devoluciones - Obtener todas las devoluciones de un reparto
  // router.get('/:repartoId/devoluciones', verificarRol(['SUPERADMIN', 'ADMINISTRADOR', 'REPARTIDOR']), controller.obtenerPorReparto);

  return router;
};