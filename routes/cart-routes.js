const express = require('express');
const cartController = require('../controllers/cart-controller');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, cartController.getCart);
router.post('/add', auth, cartController.addToCart);
router.put('/update', auth, cartController.updateQuantity);
router.delete('/item/:productId', auth, cartController.removeFromCart);

module.exports = router;