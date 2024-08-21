const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const tasksRouter = require('./routes/route-tasks');
app.use('/tasks', tasksRouter);

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack); // Registrar el error para el desarrollo
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    // Opcional: Puedes incluir una traza del error en desarrollo
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Middleware para manejar rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ message: 'Not Found' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});