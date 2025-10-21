const express = require('express');
const { sequelize } = require('./src/infrastructure/database/models/models');

const ProductoRepositorySequelize = require('./src/infrastructure/database/repositories/ProductoRepositorySequelize');
const ProductoAppService = require('./src/application/services/ProductoAppService');
const productosRoutesFactory = require('./src/infrastructure/http/routes/productos.js'); // ← factory
const cors = require('cors');

async function bootstrap() {
  try {
    await sequelize.authenticate();
    console.log('✅ Conectado a la BD');

    const app = express();
    app.use(express.json());
    
    // CORS para que el front pueda modificar cosas hacia el back
    app.use(cors({
      origin: [
        'http://localhost:3000',
        'http://192.168.0.181:3000'
      ],
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type'],
    }));
    // DI
    const productoRepo = new ProductoRepositorySequelize();
    const productoAppService = new ProductoAppService({ productoRepo });

    // Rutas (SOLO factory; NO instancie el controller acá)
    app.use('/api/productos', productosRoutesFactory({ productoAppService }));

    // Healthcheck
    app.get('/health', (req, res) => res.send('ok'));

    // Error handler (siempre al final)
    app.use((err, req, res, next) => {
      console.error(err);
      const status = err.statusCode || 500;
      res.status(status).json({ errors: [err.message] });
    });

    app.listen(4000, () => console.log('🚀 API en :4000'));
  } catch (err) {
    console.error('❌ No se pudo iniciar la app:', err);
  }
}

bootstrap();
