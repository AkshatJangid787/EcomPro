const express = require("express");
const { getOrders, createOrder } = require("../controller/order");
const { authenticate } = require("../middleware/auth");
const router = express.Router();

// Get orders for the logged-in user
router.get("/", authenticate, getOrders);

// Create an order
router.post("/", authenticate, createOrder);

module.exports = router;
