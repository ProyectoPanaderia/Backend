const jwt = require('jsonwebtoken');

// 1. Verifica que el usuario tenga un token válido
const verificarToken = (req, res, next) => {
  // El frontend (Next.js) enviará el token en el header: "Authorization: Bearer <token>"
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Acceso denegado. Token no proporcionado.' });
  }

  try {
    // Usamos el mismo secreto con el que firmamos el token en AuthAppService
    const secret = process.env.JWT_SECRET || 'secreto_super_seguro_para_desarrollo';
    const decoded = jwt.verify(token, secret);
    
    // Guardamos los datos del usuario (id, username, rol, repartoId) en la request
    // para que los controladores puedan usar esta información
    req.usuario = decoded; 
    next(); // Todo en orden, pasa al siguiente controlador
  } catch (error) {
    res.status(403).json({ error: 'Token inválido o expirado.' });
  }
};

// 2. Verifica que el usuario tenga el rol adecuado
const verificarRol = (rolesPermitidos) => {
  return (req, res, next) => {
    // Si req.usuario no existe (no pasó verificarToken) o su rol no está en la lista
    if (!req.usuario || !rolesPermitidos.includes(req.usuario.rol)) {
      return res.status(403).json({ error: 'No tienes permisos para realizar esta acción.' });
    }
    next();
  };
};

module.exports = { verificarToken, verificarRol };