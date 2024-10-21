const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [6, 'El nombre debe tener al menos 6 caracteres']
  },
  email: {
    type: String,
    required: true,
    unique: true,  // Evita correos duplicados
    match: [/^\S+@\S+\.\S+$/, 'Por favor ingresa un correo válido']
  },
  password: {
    type: String,
    required: true,
    minlength: [6, 'La contraseña debe tener al menos 6 caracteres']
  },
  role: {
    type: String,
    enum: ['cliente', 'tatuador', 'recepcionista', 'administrador'],
    default: 'cliente'
  }
}, { timestamps: true });

// Encriptar la contraseña antes de guardarla
UserSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

const User = mongoose.model('User', UserSchema);

module.exports = User;

