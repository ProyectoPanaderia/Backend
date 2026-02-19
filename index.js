const express = require('express');
const cors = require('cors');
const { sequelize } = require('./src/infrastructure/database/models/models');

const ProductoRepositorySequelize = require('./src/infrastructure/database/repositories/ProductoRepositorySequelize');
const ClienteRepositorySequelize = require('./src/infrastructure/database/repositories/ClienteRepositorySequelize');
const CiudadRepositorySequelize = require('./src/infrastructure/database/repositories/CiudadRepositorySequelize');
const RepartoRepositorySequelize = require('./src/infrastructure/database/repositories/RepartoRepositorySequelize');
const ExistenciaRepositorySequelize = require('./src/infrastructure/database/repositories/ExistenciaRepositorySequelize');
const PedidoRepositorySequelize = require('./src/infrastructure/database/repositories/PedidoRepositorySequelize');
const LineaPedidoRepositorySequelize = require('./src/infrastructure/database/repositories/LineaPedidoRepositorySequelize');
const RemitoRepositorySequelize = require('./src/infrastructure/database/repositories/RemitoRepositorySequelize');
const LineaRemitoRepositorySequelize = require('./src/infrastructure/database/repositories/LineaRemitoRepositorySequelize');
const DevolucionRepositorySequelize = require('./src/infrastructure/database/repositories/DevolucionRepositorySequelize');
const VehiculoRepositorySequelize = require('./src/infrastructure/database/repositories/VehiculoRepositorySequelize');
const EmpleadoRepositorySequelize = require('./src/infrastructure/database/repositories/EmpleadoRepositorySequelize');
const PrecioProductoRepositorySequelize = require('./src/infrastructure/database/repositories/PrecioProductoRepositorySequelize');
const AuthRepositorySequelize = require('./src/infrastructure/database/repositories/AuthRepositorySequelize');

const ProductoAppService = require('./src/application/services/ProductoAppService');
const ClienteAppService = require('./src/application/services/ClienteAppService');
const CiudadAppService = require('./src/application/services/CiudadAppService');
const RepartoAppService = require('./src/application/services/RepartoAppService');
const ExistenciaAppService = require('./src/application/services/ExistenciaAppService');
const PedidoAppService = require('./src/application/services/PedidoAppService');
const LineaPedidoAppService = require('./src/application/services/LineaPedidoAppService');
const RemitoAppService = require('./src/application/services/RemitoAppService');
const LineaRemitoAppService = require('./src/application/services/LineaRemitoAppService');
const DevolucionAppService = require('./src/application/services/DevolucionAppService');
const VehiculoAppService = require('./src/application/services/VehiculoAppService');
const EmpleadoAppService = require('./src/application/services/EmpleadoAppService');
const PrecioProductoAppService = require('./src/application/services/PrecioProductoAppService');
const AuthAppService = require('./src/application/services/AuthAppService');

const productosRoutesFactory = require('./src/infrastructure/http/routes/productos.js');
const clientesRoutesFactory = require('./src/infrastructure/http/routes/clientes.js');
const ciudadesRoutesFactory = require('./src/infrastructure/http/routes/ciudades.js');
const repartosRoutesFactory = require('./src/infrastructure/http/routes/repartos.js');
const existenciasRoutesFactory = require('./src/infrastructure/http/routes/existencias.js');
const pedidosRoutesFactory = require('./src/infrastructure/http/routes/pedidos.js');
const lineasPedidoRoutesFactory = require('./src/infrastructure/http/routes/lineasPedido.js');
const remitosRoutesFactory = require('./src/infrastructure/http/routes/remitos.js');
const lineasRemitoRoutesFactory = require('./src/infrastructure/http/routes/lineas-remito.js');
const devolucionsRoutesFactory = require('./src/infrastructure/http/routes/devoluciones.js');
const vehiculosRoutesFactory = require('./src/infrastructure/http/routes/vehiculos.js');
const empleadosRoutesFactory = require('./src/infrastructure/http/routes/empleados.js');
const precioProductosRoutesFactory = require('./src/infrastructure/http/routes/precioProductos.js');
const authRoutesFactory = require('./src/infrastructure/http/routes/auth.js');

async function bootstrap() {
  try {
    await sequelize.authenticate();
    console.log('Conectado a la BD');

    await sequelize.sync({ alter: true });
    console.log('Modelos de Sequelize sincronizados con la Base de Datos');

    const app = express();
    app.use(express.json());

    // CORS compatible con móviles
    app.use(
      cors({
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
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
    const existenciaRepo = new ExistenciaRepositorySequelize();
    const pedidoRepo = new PedidoRepositorySequelize();
    const lineaPedidoRepo = new LineaPedidoRepositorySequelize();
    const remitoRepo = new RemitoRepositorySequelize();
    const lineaRemitoRepo = new LineaRemitoRepositorySequelize();
    const devolucionRepo = new DevolucionRepositorySequelize();
    const vehiculoRepo = new VehiculoRepositorySequelize();
    const empleadoRepo = new EmpleadoRepositorySequelize();
    const precioProductoRepo = new PrecioProductoRepositorySequelize();
    const authRepo = new AuthRepositorySequelize();

    const productoAppService = new ProductoAppService({ productoRepo });
    const clienteAppService = new ClienteAppService({ clienteRepo, ciudadRepo });
    const ciudadAppService = new CiudadAppService({ ciudadRepo });
    const repartoAppService = new RepartoAppService({ repartoRepo });
    const existenciaAppService = new ExistenciaAppService({ existenciaRepo });
    const pedidoAppService = new PedidoAppService({ pedidoRepo });
    const lineaPedidoAppService = new LineaPedidoAppService({ lineaPedidoRepo, pedidoRepo });
    const remitoAppService = new RemitoAppService({remitoRepo, clienteRepo, repartoRepo });
    const lineaRemitoAppService = new LineaRemitoAppService({lineaRemitoRepo, remitoRepo, existenciaRepo});
    const devolucionAppService = new DevolucionAppService({ devolucionRepo, repartoRepo });
    const vehiculoAppService = new VehiculoAppService({ vehiculoRepo, repartoRepo });
    const empleadoAppService = new EmpleadoAppService({ empleadoRepo, repartoRepo });
    const precioProductoAppService = new PrecioProductoAppService({ precioProductoRepo, productoRepo });
    const authAppService = new AuthAppService({ usuarioRepo: authRepo, empleadoRepo: empleadoRepo });
    
    app.use('/api/productos', productosRoutesFactory({ productoAppService }));
    app.use('/api/clientes', clientesRoutesFactory({ clienteAppService }));
    app.use('/api/ciudades', ciudadesRoutesFactory({ ciudadAppService }));
    app.use('/api/repartos', repartosRoutesFactory({ repartoAppService }));
    app.use('/api/existencias', existenciasRoutesFactory({ existenciaAppService }));
    app.use('/api/pedidos', pedidosRoutesFactory({ pedidoAppService }));
    app.use('/api/lineas-pedido', lineasPedidoRoutesFactory({ lineaPedidoAppService }));
    app.use('/api/remitos', remitosRoutesFactory({ remitoAppService }));
    app.use('/api/lineas-remito', lineasRemitoRoutesFactory({ lineaRemitoAppService }));
    app.use('/api/vehiculos', vehiculosRoutesFactory({ vehiculoAppService }));
    app.use('/api/empleados', empleadosRoutesFactory({ empleadoAppService }));
    app.use('/api/devoluciones', devolucionsRoutesFactory({ devolucionAppService }));
    app.use('/api/precio-productos', precioProductosRoutesFactory({ precioProductoAppService }));
    app.use('/api/auth', authRoutesFactory({ authAppService }));

    // Healthcheck
    app.get('/health', (req, res) => res.send('ok'));

    // Middleware de errores
    app.use((err, req, res, next) => {
      console.error(err);
      const status = err.statusCode || 500;
      res.status(status).json({ errors: [err.message] });
    });

    app.listen(4000, () => {
      console.log('API corriendo en http://localhost:4000');
    });
  } catch (err) {
    console.error('No se pudo iniciar la app:', err);
  }
}

bootstrap();