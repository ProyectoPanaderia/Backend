const express = require('express');
const { sequelize } = require('./src/infrastructure/database/models/models');

const ProductoRepositorySequelize = require('./src/infrastructure/database/repositories/ProductoRepositorySequelize');
const ProductoAppService = require('./src/application/services/ProductoAppService');
const productosRoutesFactory = require('./src/infrastructure/http/routes/productos.js'); // ← factory

async function bootstrap() {
  try {
    await sequelize.authenticate();
    console.log('✅ Conectado a la BD');

    const app = express();
    app.use(express.json());

    // DI
    const productoRepo = new ProductoRepositorySequelize();
    const productoAppService = new ProductoAppService({ productoRepo });

    // Rutas (SOLO factory; NO instancie el controller acá)
    app.use('/productos', productosRoutesFactory({ productoAppService }));

    // Healthcheck
    app.get('/health', (req, res) => res.send('ok'));

    // Error handler (siempre al final)
    app.use((err, req, res, next) => {
      console.error(err);
      const status = err.statusCode || 500;
      res.status(status).json({ errors: [err.message] });
    });

    app.listen(3000, () => console.log('🚀 API en :3000'));
  } catch (err) {
    console.error('❌ No se pudo iniciar la app:', err);
  }
}

bootstrap();
