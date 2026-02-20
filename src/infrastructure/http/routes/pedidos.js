const { Router } = require('express');
const PedidoController = require('../../../interface/controllers/PedidoController');
// 1. IMPORTÁ TU MIDDLEWARE (Ajustá la ruta según tu carpeta, suele ser así:)
const { verificarToken } = require('../middleware/authMiddleware'); 

module.exports = function pedidosRoutesFactory({ pedidoAppService }) {
  const router = Router();
  const controller = new PedidoController(pedidoAppService);

  // 2. ACTIVÁ EL MIDDLEWARE PARA TODAS LAS RUTAS DE ESTE ARCHIVO
  // Esto hace que req.usuario se cargue ANTES de llegar a cualquier método del controlador
  router.use(verificarToken);

  router.get('/ultimo/:clienteId', controller.obtenerUltimoPorCliente);
  
  // POST /pedidos
  router.post('/', controller.crear);

  // GET /pedidos
  router.get('/', controller.listar);

  // GET /pedidos/:id
  router.get('/:id', controller.obtener);

  // PATCH /pedidos/:id
  router.patch('/:id', controller.editar);

  // PATCH /pedidos/:id/estado
  router.patch('/:id/estado', controller.cambiarEstado);

  // DELETE /pedidos/:id
  router.delete('/:id', controller.eliminar);

  return router;
};