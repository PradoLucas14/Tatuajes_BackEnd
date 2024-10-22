const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 6,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  role: {
    type: String,
    required: true,
    enum: ['cliente', 'tatuador', 'recepcionista', 'administrador'],
    default: 'cliente',
  },
  claveDeAccion: {
    type: String,
    required: true,
  }
});

// Encriptar la clave de acción antes de guardar el usuario
UserSchema.pre('save', async function(next) {
  if (this.isModified('claveDeAccion')) {
    const salt = await bcrypt.genSalt(10);
    this.claveDeAccion = await bcrypt.hash(this.claveDeAccion, salt);
  }
  next();
});

// Encriptar la contraseña antes de guardarla
UserSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

module.exports = mongoose.model('User', UserSchema);
