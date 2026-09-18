const express = require('express');
const productController = require('../controllers/product-controller');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const router = express.Router();

// Public routes
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);

// Admin routes (Use direct path matching)
router.post('/', [auth, admin], productController.createProduct);
router.post('/add', [auth, admin], productController.createProduct); // Handles both endpoints
router.put('/:id', [auth, admin], productController.updateProduct);
router.delete('/:id', [auth, admin], productController.deleteProduct);

module.exports = router;