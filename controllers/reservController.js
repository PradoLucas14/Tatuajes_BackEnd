const Reserv = require('../models/Reserv'); // Asumiendo que el modelo se llama "Reserv"

// Crear una nueva reservación
const createReserv = async (req, res) => {
    try {
      const { cliente, fecha, hora, tatuador } = req.body;
  
      // Verificar si ya existe una reservación para el mismo tatuador en la misma fecha y hora
      const existingReserv = await Reserv.findOne({ fecha, hora, tatuador });
      if (existingReserv) {
        return res.status(400).json({ error: 'El tatuador ya tiene una reserva en esta fecha y hora' });
      }
  
      // Crear y guardar la nueva reservación
      const reserv = new Reserv({ cliente, fecha, hora, tatuador });
      await reserv.save();
      res.status(201).json(reserv);
    } catch (error) {
      res.status(500).json({ error: 'Error al agendar la reservación' });
    }
};

// Obtener todas las reservaciones
const getReservs = async (req, res) => {
  try {
    const reservs = await Reserv.find();
    res.status(200).json(reservs);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las reservaciones' });
  }
};

// Actualizar una reservación existente
const updateReserv = async (req, res) => {
  try {
    const reserv = await Reserv.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(reserv);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la reservación' });
  }
};

// Eliminar una reservación
const deleteReserv = async (req, res) => {
  try {
    await Reserv.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Reservación eliminada' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la reservación' });
  }
};

module.exports = { createReserv, getReservs, updateReserv, deleteReserv };
