const cors = require('cors');
const helmet = require('helmet');

/**
 * Configuración de CORS
 */
const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

/**
 * Middleware de seguridad
 */
const securityMiddleware = [
  // Helmet para headers de seguridad
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", 'data:', 'https:']
      }
    },
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true
    },
    frameguard: { action: 'deny' },
    noSniff: true,
    xssFilter: true
  }),
  
  // CORS
  cors(corsOptions),

  // Prevenir rate limiting
  // (opcional: agregar express-rate-limit si es necesario)
];

module.exports = {
  corsOptions,
  securityMiddleware
};