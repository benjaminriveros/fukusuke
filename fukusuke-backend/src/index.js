const express = require('express');
const sequelize = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const saleRoutes = require('./routes/saleRoutes');
const customerRoutes = require('./routes/customerRoutes');
const { enviarCorreo } = require('./routes/confirmarMail');
const sendGridMail = require('@sendgrid/mail');
require('dotenv').config();

sendGridMail.setApiKey(process.env.SENDGRID_API_KEY);

const app = express();
const cors = require('cors');

// Configuración de CORS
app.use(cors({
  origin: '*', // Permite solicitudes desde cualquier origen
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos HTTP permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Headers permitidos
}));
// Middleware global
app.use(express.json());

// Conectar las rutas
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/sales', saleRoutes);
app.use('/api/customers', customerRoutes);

// Ruta para enviar el código de verificación
app.post('/enviar-correo', async (req, res) => {
  const { correoDestino } = req.body;  // Obtener el correo desde el cuerpo de la solicitud

  try {
    const result = await enviarCorreo(correoDestino);  // Llamar a la función de confirmarMail.js
    res.json(result);  // Retornar el código generado y el mensaje
  } catch (error) {
    res.status(500).json({ error: 'No se pudo enviar el correo' });  // Manejar el error
  }
});

// Conectar con la base de datos
sequelize.authenticate()
  .then(() => console.log('Database connected!'))
  .catch(err => console.log('Error connecting to database:', err));

// Sincronizar los modelos sin eliminar tablas
sequelize.sync().then(() => {
  console.log('Models synced with database!');
}).catch(err => console.log('Error syncing models:', err));

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
