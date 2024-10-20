// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { registerUser, getUsers, getUserById, updateUser, deleteUser } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// Ruta para registrar un nuevo usuario (abierta a todos)
router.post('/register', registerUser);

// Ruta para obtener todos los usuarios (solo administradores)
router.get('/', authMiddleware, roleMiddleware('administrador'), getUsers);

// Ruta para obtener un usuario por ID (todos los usuarios pueden ver su propio perfil)
router.get('/:id', authMiddleware, getUserById);

// Ruta para actualizar un usuario (solo el propio usuario o un administrador)
router.put('/:id', authMiddleware, roleMiddleware('administrador', 'cliente'), updateUser);

// Ruta para eliminar un usuario (solo administradores)
router.delete('/:id', authMiddleware, roleMiddleware('administrador'), deleteUser);

module.exports = router;
