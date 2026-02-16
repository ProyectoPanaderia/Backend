/**
 * Middleware para manejar errores globalmente
 * @param {Error} err
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const errorHandler = (err, req, res, next) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || 'Error interno del servidor';

  console.error(`[${new Date().toISOString()}] Error:`, {
    status,
    message,
    path: req.path,
    method: req.method,
    stack: err.stack
  });

  // Errores de validación
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      status: 400,
      message: 'Error de validación',
      errors: err.errors || [message]
    });
  }

  // Errores de base de datos
  if (err.name === 'SequelizeValidationError') {
    return res.status(400).json({
      status: 400,
      message: 'Error de validación en base de datos',
      errors: err.errors.map(e => ({ field: e.path, message: e.message }))
    });
  }

  if (err.name === 'SequelizeUniqueConstraintError') {
    return res.status(409).json({
      status: 409,
      message: 'El registro ya existe',
      field: err.errors[0].path
    });
  }

  // Errores de autenticación
  if (err.status === 401 || err.name === 'UnauthorizedError') {
    return res.status(401).json({
      status: 401,
      message: 'No autorizado'
    });
  }

  // Errores de permisos
  if (err.status === 403 || err.name === 'ForbiddenError') {
    return res.status(403).json({
      status: 403,
      message: 'Acceso denegado'
    });
  }

  // Error 404
  if (err.status === 404 || err.name === 'NotFoundError') {
    return res.status(404).json({
      status: 404,
      message: message
    });
  }

  // Error genérico
  res.status(status).json({
    status,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

module.exports = errorHandler;