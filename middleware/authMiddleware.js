// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('x-auth-token');  // Extraemos el token del header

  if (!token) {
    return res.status(401).json({ msg: 'Acceso denegado. No hay token.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);  // Verificamos el token
    req.user = decoded.user;  // Añadimos el usuario decodificado a la request
    next();  // Continuamos con el siguiente middleware
  } catch (error) {
    res.status(400).json({ msg: 'Token no válido' });
  }
};

module.exports = authMiddleware;
