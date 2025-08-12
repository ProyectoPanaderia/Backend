// index.js
const express = require('express');
const bodyParser = require('body-parser');

// 1) Infra: modelos + repo
const { sequelize } = require('./src/infrastructure/database/models/models.js'); // tu index que exporta sequelize
const ProductoRepositorySequelize = require('./src/infrastructure/database/repositories/ProductoRepositorySequelize');

// 2) App service
const ProductoAppService = require('./src/application/services/ProductoAppService');

// 3) Controller
const ProductoController = require('./src/interfaces/controllers/ProductoController');

async function bootstrap() {
  // Probar conexión BD (opcional pero útil)
  await sequelize.authenticate();
  console.log('✅ Conectado a la BD');

  const repo = new ProductoRepositorySequelize();
  const service = new ProductoAppService(repo);
  const controller = new ProductoController(service);

  const app = express();
  app.use(bodyParser.json());

  // Rutas reales contra BD
  app.get('/productos', controller.obtenerProductos);
  app.post('/productos', controller.crearProducto);

  // Middleware de errores (último)
  app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status ?? 500).json({ error: err.message ?? 'Error interno' });
  });

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`🚀 http://localhost:${PORT}`));
}

bootstrap().catch(err => {
  console.error('❌ No se pudo iniciar la app:', err);
  process.exit(1);
});
