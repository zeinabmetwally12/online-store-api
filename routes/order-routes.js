const express = require('express');
const orderController = require('../controllers/order-controller');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/checkout', auth, orderController.createOrder);
router.get('/', auth, orderController.getUserOrders);

module.exports = router;