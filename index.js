const express = require('express');
const cors = require('cors');
const { sequelize } = require('./src/infrastructure/database/models/models');

// Repos
const ProductoRepositorySequelize = require('./src/infrastructure/database/repositories/ProductoRepositorySequelize');
const ClienteRepositorySequelize = require('./src/infrastructure/database/repositories/ClienteRepositorySequelize');
const CiudadRepositorySequelize = require('./src/infrastructure/database/repositories/CiudadRepositorySequelize');

const ProductoAppService = require('./src/application/services/ProductoAppService');
const ClienteAppService = require('./src/application/services/ClienteAppService');
const CiudadAppService = require('./src/application/services/CiudadAppService');

// Factories
const productosRoutesFactory = require('./src/infrastructure/http/routes/productos.js');
const clientesRoutesFactory = require('./src/infrastructure/http/routes/clientes.js');
const ciudadesRoutesFactory = require('./src/infrastructure/http/routes/ciudades.js');

async function bootstrap() {
  try {
    await sequelize.authenticate();
    console.log('✅ Conectado a la BD');

    const app = express();
    app.use(express.json());

    //CORS
    app.use(
      cors({
        origin: [
          'http://localhost:3000',
          'http://192.168.0.181:3000'
        ],
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type'],
      })
    );

    const productoRepo = new ProductoRepositorySequelize();
    const clienteRepo = new ClienteRepositorySequelize();
    const ciudadRepo = new CiudadRepositorySequelize();

    const productoAppService = new ProductoAppService({ productoRepo });
    const clienteAppService = new ClienteAppService({ clienteRepo, ciudadRepo });
    const ciudadAppService = new CiudadAppService({ ciudadRepo });

    app.use('/api/productos', productosRoutesFactory({ productoAppService }));
    app.use('/api/clientes', clientesRoutesFactory({ clienteAppService }));
    app.use('/api/ciudades', ciudadesRoutesFactory({ ciudadAppService }));

    // Healthcheck
    app.get('/health', (req, res) => res.send('ok'));

    // Middleware de errores
    app.use((err, req, res, next) => {
      console.error(err);
      const status = err.statusCode || 500;
      res.status(status).json({ errors: [err.message] });
    });

    app.listen(4000, () => console.log('🚀 API corriendo en http://localhost:4000'));
  } catch (err) {
    console.error('❌ No se pudo iniciar la app:', err);
  }
}

bootstrap();