const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

exports.registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  // Validaciones de campos
  if (!name || !email || !password || !role) {
    return res.status(400).json({ msg: "Por favor ingresa todos los campos" });
  }

  if (name.length < 6) {
    return res.status(400).json({ msg: "El nombre debe tener al menos 6 caracteres" });
  }

  if (password.length < 6) {
    return res.status(400).json({ msg: "La contraseña debe tener al menos 6 caracteres" });
  }

  // Verificar si el correo ya está registrado
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "El correo electrónico ya está en uso" });
    }

    // Crear el nuevo usuario
    const newUser = new User({
      name,
      email,
      password,
      role
    });

    // Guardar el usuario
    await newUser.save();

    res.status(201).json({ msg: "Usuario registrado correctamente" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

// Obtener todos los usuarios (solo administradores)
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al obtener los usuarios' });
  }
};

// Obtener un usuario por ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al obtener el usuario' });
  }
};

// Actualizar un usuario (solo el mismo usuario o un administrador)
exports.updateUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }

    // Si el rol se está actualizando, lo hacemos solo si el usuario es un administrador
    if (role && req.user.role !== 'administrador') {
      return res.status(403).json({ msg: 'No tienes permisos para actualizar el rol' });
    }

    // Actualizar el nombre, correo y rol
    if (name) user.name = name;
    if (email) user.email = email;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }
    if (role) user.role = role;

    await user.save();
    res.json({ msg: 'Usuario actualizado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al actualizar el usuario' });
  }
};

// Eliminar un usuario (solo un administrador)
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }

    await user.remove();
    res.json({ msg: 'Usuario eliminado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al eliminar el usuario' });
  }
};
