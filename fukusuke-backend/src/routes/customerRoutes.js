const express = require('express');
const {
  getCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} = require('../controllers/customerController');
const { authenticate, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

// Rutas de clientes
router.get('/', authenticate, authorize('administrador'), getCustomers); // Obtener todos los clientes
router.post('/', authenticate, authorize('administrador'), createCustomer); // Crear un cliente
router.put('/:id', authenticate, authorize('administrador'), updateCustomer); // Actualizar un cliente
router.delete('/:id', authenticate, authorize('administrador'), deleteCustomer); // Eliminar un cliente

module.exports = router;
