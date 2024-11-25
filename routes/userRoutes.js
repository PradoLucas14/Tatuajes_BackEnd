// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { registerUser, getUsers, getUserById, updateUser, deleteUser } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');  // Esto lo mantenemos para otras rutas
const roleMiddleware = require('../middleware/roleMiddleware');  // Esto también se usa para las rutas protegidas

// Ruta para registrar un nuevo usuario (abierta para cualquier persona, no necesita autenticación)
router.post('/register', registerUser);

// Ruta para obtener todos los usuarios (solo administradores, protegida con authMiddleware y roleMiddleware)
router.get('/', getUsers);

// Ruta para obtener un usuario por ID (todos los usuarios pueden ver su propio perfil, protegida con authMiddleware)
router.get('/:id', authMiddleware, getUserById);

// Ruta para actualizar un usuario (solo el propio usuario o un administrador, protegida con authMiddleware y roleMiddleware)
router.put('/:id', authMiddleware, roleMiddleware('administrador', 'cliente'), updateUser);

// Ruta para eliminar un usuario (solo administradores, protegida con authMiddleware y roleMiddleware)
router.delete('/:id', authMiddleware, roleMiddleware('administrador'), deleteUser);

module.exports = router;

