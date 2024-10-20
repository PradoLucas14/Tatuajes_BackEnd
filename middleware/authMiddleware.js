// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const config = require('../config/config');

const authMiddleware = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ msg: 'Acceso denegado. No hay token.' });
  }

  try {
    const decoded = jwt.verify(token, config.secretKey);
    req.user = decoded;  // Añadir el usuario decodificado a la solicitud
    next();
  } catch (error) {
    res.status(400).json({ msg: 'Token no válido' });
  }
};

module.exports = authMiddleware;
