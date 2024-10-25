const mongoose = require('mongoose');

const reservSchema = new mongoose.Schema({
  cliente: { type: String, required: true },
  fecha: { type: Date, required: true },
  hora: { type: String, required: true }, // Nuevo campo para la hora
  tatuador: { type: String, required: true },
  estado: { type: String, enum: ['pendiente', 'completado', 'cancelado'], default: 'pendiente' },
});

module.exports = mongoose.model('Reserv', reservSchema);
