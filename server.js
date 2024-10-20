// server.js
require('dotenv').config(); // Cargar las variables de entorno

const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const authMiddleware = require('./middleware/authMiddleware');

const app = express();

// Conectar a la base de datos
connectDB();

// Middleware para parsear los datos JSON del cuerpo de la solicitud
app.use(express.json());

// Rutas
app.use('/api/users', userRoutes);

// Puerto de la aplicación
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
