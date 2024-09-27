const express = require('express');
const { createOrder, getAllOrders, getOrderStats } = require('../controller/order');

const router = express.Router();

router.post('/orders', createOrder);
router.get('/orders', getAllOrders);
router.get('/order-stats', getOrderStats);

module.exports = router;
