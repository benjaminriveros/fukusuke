const express = require('express');
const { getSales, createSale } = require('../controllers/saleController');
const { authenticate, authorize } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', authenticate, authorize('administrador', 'cajero'), getSales);
router.post('/', authenticate, authorize('cajero'), createSale);

module.exports = router;
