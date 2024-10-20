// middleware/roleMiddleware.js
const roleMiddleware = (...roles) => {
    return (req, res, next) => {
      // Comprobamos si el usuario tiene uno de los roles permitidos
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({ msg: 'Acceso denegado. No tienes los permisos necesarios.' });
      }
      next();  // Si el usuario tiene un rol válido, continuamos con la solicitud
    };
  };
  
  module.exports = roleMiddleware;
  