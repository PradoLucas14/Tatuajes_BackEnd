require('dotenv').config();  // Cargar las variables de entorno desde el archivo .env

const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const morgan = require('morgan');  // Importar morgan
const app = express();

// Conectar a la base de datos
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));  // Agregar morgan como middleware

// Rutas
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/reservs', require('./routes/reservRoutes'));

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
