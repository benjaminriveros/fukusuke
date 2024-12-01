const express = require('express');
const { getOrders, createOrder, updateOrderStatus } = require('../controllers/orderController');
const { authenticate, authorize } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', authenticate, authorize('administrador', 'cajero'), getOrders);
router.post('/', authenticate, authorize('cliente'), createOrder);
router.put('/:id', authenticate, authorize('administrador', 'cajero'), updateOrderStatus);

module.exports = router;
