// middleware/roleMiddleware.js
const roleMiddleware = (...allowedRoles) => {
    return (req, res, next) => {
      if (!req.user || !allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ msg: 'No tienes permisos para acceder a esta ruta' });
      }
      next();
    };
  };
  
  module.exports = roleMiddleware;
  