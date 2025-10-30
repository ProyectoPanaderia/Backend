const express = require('express');
const cors = require('cors');
const { sequelize } = require('./src/infrastructure/database/models/models');

const ProductoRepositorySequelize = require('./src/infrastructure/database/repositories/ProductoRepositorySequelize');
const ClienteRepositorySequelize = require('./src/infrastructure/database/repositories/ClienteRepositorySequelize');
const CiudadRepositorySequelize = require('./src/infrastructure/database/repositories/CiudadRepositorySequelize');
const RepartoRepositorySequelize = require('./src/infrastructure/database/repositories/RepartoRepositorySequelize');


const ProductoAppService = require('./src/application/services/ProductoAppService');
const ClienteAppService = require('./src/application/services/ClienteAppService');
const CiudadAppService = require('./src/application/services/CiudadAppService');
const RepartoAppService = require('./src/application/services/RepartoAppService');


const productosRoutesFactory = require('./src/infrastructure/http/routes/productos.js');
const clientesRoutesFactory = require('./src/infrastructure/http/routes/clientes.js');
const ciudadesRoutesFactory = require('./src/infrastructure/http/routes/ciudades.js');
const repartosRoutesFactory = require('./src/infrastructure/http/routes/repartos.js');


async function bootstrap() {
  try {
    await sequelize.authenticate();
    console.log('✅ Conectado a la BD');

    const app = express();
    app.use(express.json());

    // CORS compatible con móviles
    app.use(
      cors({
        origin: '*', // todos los orígenes (ajustaremos si querés más adelante)
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        preflightContinue: false,
        optionsSuccessStatus: 204,
      })
    );

    // Permitir preflight manualmente
    app.options('*', cors());

    const productoRepo = new ProductoRepositorySequelize();
    const clienteRepo = new ClienteRepositorySequelize();
    const ciudadRepo = new CiudadRepositorySequelize();
    const repartoRepo = new RepartoRepositorySequelize();

    const productoAppService = new ProductoAppService({ productoRepo });
    const clienteAppService = new ClienteAppService({ clienteRepo, ciudadRepo });
    const ciudadAppService = new CiudadAppService({ ciudadRepo });
    const repartoAppService = new RepartoAppService({ repartoRepo });

    app.use('/api/productos', productosRoutesFactory({ productoAppService }));
    app.use('/api/clientes', clientesRoutesFactory({ clienteAppService }));
    app.use('/api/ciudades', ciudadesRoutesFactory({ ciudadAppService }));
    app.use('/api/repartos', repartosRoutesFactory({ repartoAppService }));

    // Healthcheck
    app.get('/health', (req, res) => res.send('ok'));

    // Middleware de errores
    app.use((err, req, res, next) => {
      console.error(err);
      const status = err.statusCode || 500;
      res.status(status).json({ errors: [err.message] });
    });

    app.listen(4000, () => {
      console.log('🚀 API corriendo en http://localhost:4000');
    });
  } catch (err) {
    console.error('❌ No se pudo iniciar la app:', err);
  }
}

bootstrap();