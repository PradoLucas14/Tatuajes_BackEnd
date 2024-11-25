const express = require('express');
const router = express.Router();
const { createReserv, getReservs, updateReserv, deleteReserv } = require('../controllers/reservController');

// Ruta para agendar una nueva reservación
router.post('/', createReserv);

// Ruta para obtener todas las reservaciones
router.get('/', getReservs);

// Ruta para actualizar una reservación existente
router.patch('/:id', updateReserv);

// Ruta para eliminar una reservación
router.delete('/:id', deleteReserv);

module.exports = router;
