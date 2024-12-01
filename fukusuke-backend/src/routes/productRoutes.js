const express = require('express');
const { getProducts, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const { authenticate, authorize } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', getProducts);
router.post('/', authenticate, authorize('administrador'), createProduct);
router.put('/:id', authenticate, authorize('administrador'), updateProduct);
router.delete('/:id', authenticate, authorize('administrador'), deleteProduct);

module.exports = router;
