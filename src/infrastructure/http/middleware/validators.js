const { body, param, query, validationResult } = require('express-validator');

/**
 * Middleware para manejar errores de validación
 */
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 400,
      message: 'Error de validación',
      errors: errors.array().map(err => ({
        field: err.path,
        message: err.msg,
        value: err.value
      }))
    });
  }
  next();
};

/**
 * Validadores para Remito
 */
const validateCreateRemito = [
  body('total')
    .isFloat({ min: 0 })
    .withMessage('total debe ser un número positivo'),
  body('fecha')
    .isISO8601()
    .withMessage('fecha debe ser una fecha válida (YYYY-MM-DD)'),
  body('clienteId')
    .isInt({ min: 1 })
    .withMessage('clienteId debe ser un número positivo'),
  body('repartoId')
    .isInt({ min: 1 })
    .withMessage('repartoId debe ser un número positivo'),
  handleValidationErrors
];

const validateUpdateRemito = [
  body('total')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('total debe ser un número positivo'),
  body('fecha')
    .optional()
    .isISO8601()
    .withMessage('fecha debe ser una fecha válida'),
  body('clienteId')
    .optional()
    .isInt({ min: 1 })
    .withMessage('clienteId debe ser un número positivo'),
  body('repartoId')
    .optional()
    .isInt({ min: 1 })
    .withMessage('repartoId debe ser un número positivo'),
  handleValidationErrors
];

/**
 * Validadores para LineaRemito
 */
const validateCreateLineaRemito = [
  body('cantidad')
    .isInt({ min: 1 })
    .withMessage('cantidad debe ser un número mayor a 0'),
  body('subtotal')
    .isFloat({ min: 0 })
    .withMessage('subtotal debe ser un número no negativo'),
  body('remitoId')
    .isInt({ min: 1 })
    .withMessage('remitoId debe ser un número positivo'),
  body('existenciaId')
    .isInt({ min: 1 })
    .withMessage('existenciaId debe ser un número positivo'),
  handleValidationErrors
];

const validateUpdateLineaRemito = [
  body('cantidad')
    .optional()
    .isInt({ min: 1 })
    .withMessage('cantidad debe ser un número mayor a 0'),
  body('subtotal')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('subtotal debe ser un número no negativo'),
  body('existenciaId')
    .optional()
    .isInt({ min: 1 })
    .withMessage('existenciaId debe ser un número positivo'),
  handleValidationErrors
];

/**
 * Validadores para Pedido
 */
const validateCreatePedido = [
  body('fechaEmision')
    .isISO8601()
    .withMessage('fechaEmision debe ser una fecha válida'),
  body('fechaEntrega')
    .isISO8601()
    .withMessage('fechaEntrega debe ser una fecha válida'),
  body('repartoId')
    .isInt({ min: 1 })
    .withMessage('repartoId debe ser un número positivo'),
  handleValidationErrors
];

const validateUpdatePedido = [
  body('fechaEmision')
    .optional()
    .isISO8601()
    .withMessage('fechaEmision debe ser una fecha válida'),
  body('fechaEntrega')
    .optional()
    .isISO8601()
    .withMessage('fechaEntrega debe ser una fecha válida'),
  body('repartoId')
    .optional()
    .isInt({ min: 1 })
    .withMessage('repartoId debe ser un número positivo'),
  handleValidationErrors
];

/**
 * Validadores para LineaPedido
 */
const validateCreateLineaPedido = [
  body('cantidad')
    .isInt({ min: 1 })
    .withMessage('cantidad debe ser un número mayor a 0'),
  body('productoId')
    .isInt({ min: 1 })
    .withMessage('productoId debe ser un número positivo'),
  body('pedidoId')
    .isInt({ min: 1 })
    .withMessage('pedidoId debe ser un número positivo'),
  handleValidationErrors
];

const validateUpdateLineaPedido = [
  body('cantidad')
    .optional()
    .isInt({ min: 1 })
    .withMessage('cantidad debe ser un número mayor a 0'),
  body('productoId')
    .optional()
    .isInt({ min: 1 })
    .withMessage('productoId debe ser un número positivo'),
  handleValidationErrors
];

/**
 * Validadores para Devolución
 */
const validateCreateDevolucion = [
  body('fecha')
    .isISO8601()
    .withMessage('fecha debe ser una fecha válida'),
  body('razon')
    .isString()
    .trim()
    .notEmpty()
    .withMessage('razon es requerida'),
  body('repartoId')
    .isInt({ min: 1 })
    .withMessage('repartoId debe ser un número positivo'),
  handleValidationErrors
];

const validateUpdateDevolucion = [
  body('fecha')
    .optional()
    .isISO8601()
    .withMessage('fecha debe ser una fecha válida'),
  body('razon')
    .optional()
    .isString()
    .trim()
    .notEmpty()
    .withMessage('razon debe ser un texto válido'),
  body('repartoId')
    .optional()
    .isInt({ min: 1 })
    .withMessage('repartoId debe ser un número positivo'),
  handleValidationErrors
];

/**
 * Validadores para Empleado
 */
const validateCreateEmpleado = [
  body('nombre')
    .isString()
    .trim()
    .notEmpty()
    .withMessage('nombre es requerido'),
  body('apellido')
    .isString()
    .trim()
    .notEmpty()
    .withMessage('apellido es requerido'),
  body('email')
    .isEmail()
    .withMessage('email debe ser válido'),
  body('telefono')
    .optional()
    .isString()
    .trim(),
  body('repartoId')
    .isInt({ min: 1 })
    .withMessage('repartoId debe ser un número positivo'),
  handleValidationErrors
];

const validateUpdateEmpleado = [
  body('nombre')
    .optional()
    .isString()
    .trim()
    .notEmpty()
    .withMessage('nombre debe ser un texto válido'),
  body('apellido')
    .optional()
    .isString()
    .trim()
    .notEmpty()
    .withMessage('apellido debe ser un texto válido'),
  body('email')
    .optional()
    .isEmail()
    .withMessage('email debe ser válido'),
  body('telefono')
    .optional()
    .isString()
    .trim(),
  body('repartoId')
    .optional()
    .isInt({ min: 1 })
    .withMessage('repartoId debe ser un número positivo'),
  handleValidationErrors
];

/**
 * Validadores para Vehículo
 */
const validateCreateVehiculo = [
  body('patente')
    .isString()
    .trim()
    .notEmpty()
    .withMessage('patente es requerida'),
  body('modelo')
    .isString()
    .trim()
    .notEmpty()
    .withMessage('modelo es requerido'),
  body('capacidad')
    .isFloat({ min: 0.1 })
    .withMessage('capacidad debe ser un número mayor a 0'),
  body('repartoId')
    .isInt({ min: 1 })
    .withMessage('repartoId debe ser un número positivo'),
  handleValidationErrors
];

const validateUpdateVehiculo = [
  body('patente')
    .optional()
    .isString()
    .trim()
    .notEmpty()
    .withMessage('patente debe ser un texto válido'),
  body('modelo')
    .optional()
    .isString()
    .trim()
    .notEmpty()
    .withMessage('modelo debe ser un texto válido'),
  body('capacidad')
    .optional()
    .isFloat({ min: 0.1 })
    .withMessage('capacidad debe ser un número mayor a 0'),
  body('repartoId')
    .optional()
    .isInt({ min: 1 })
    .withMessage('repartoId debe ser un número positivo'),
  handleValidationErrors
];

/**
 * Validadores para Ciudad
 */
const validateCreateCiudad = [
  body('nombre')
    .isString()
    .trim()
    .notEmpty()
    .withMessage('nombre es requerido'),
  handleValidationErrors
];

const validateUpdateCiudad = [
  body('nombre')
    .optional()
    .isString()
    .trim()
    .notEmpty()
    .withMessage('nombre debe ser un texto válido'),
  handleValidationErrors
];

/**
 * Validador de ID
 */
const validateIdParam = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('ID debe ser un número positivo'),
  handleValidationErrors
];

module.exports = {
  validateCreateRemito,
  validateUpdateRemito,
  validateCreateLineaRemito,
  validateUpdateLineaRemito,
  validateCreatePedido,
  validateUpdatePedido,
  validateCreateLineaPedido,
  validateUpdateLineaPedido,
  validateCreateDevolucion,
  validateUpdateDevolucion,
  validateCreateEmpleado,
  validateUpdateEmpleado,
  validateCreateVehiculo,
  validateUpdateVehiculo,
  validateCreateCiudad,
  validateUpdateCiudad,
  validateIdParam
};