const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Función para iniciar sesión (login)
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verificar si el usuario existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Usuario no encontrado' });
    }

    // Comparar la contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Contraseña incorrecta' });
    }

    // Generar el token JWT
    const payload = {
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
      },
    };

    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: '1h',
    });

    res.json({ token, user: { name: user.name, role: user.role } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error en el servidor' }); // Asegúrate de enviar un mensaje en caso de error
  }
};
