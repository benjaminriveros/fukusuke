const express = require('express');
const sequelize = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const saleRoutes = require('./routes/saleRoutes');
const customerRoutes = require('./routes/customerRoutes');

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
