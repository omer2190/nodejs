// routes/orders.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/orderController');

router.post('/', controller.createOrder);
router.get('/product/:productId', controller.getOrdersByProduct);

module.exports = router;