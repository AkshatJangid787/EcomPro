const express = require("express");
const { getCart, addToCart, clearCart, removeFromCart, updateCartItem } = require("../controller/cart");
const { authenticate } = require("../middleware/auth");
const router = express.Router();

// Get cart for the logged-in user
router.get("/", authenticate, getCart);

// Add item to cart
router.post("/add", authenticate, addToCart);

// Clear cart
router.delete("/clear", authenticate, clearCart);

// Remove item from cart
router.delete("/:productId", authenticate, removeFromCart);

// Update item quantity in cart
router.patch("/:productId", authenticate, updateCartItem);

module.exports = router;
