const Cart = require("../model/cart");
const Product = require("../model/product");

// Get cart for the logged-in user
exports.getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user.id }).populate("items.productId");
        res.status(200).send({ message: "Cart fetched successfully", data: cart });
    } catch (error) {
        res.status(500).send({ message: "Error fetching cart", error });
    }
};

// Add item to cart
exports.addToCart = async (req, res) => {
    const { productId, quantity } = req.body;

    try {
        const cart = await Cart.findOneAndUpdate(
            { userId: req.user.id },
            { $addToSet: { items: { productId, quantity } } },
            { new: true, upsert: true } // Create cart if it doesn't exist
        );
        res.status(201).send({ message: "Item added to cart", data: cart });
    } catch (error) {
        res.status(500).send({ message: "Error adding to cart", error });
    }
};

// Clear cart
exports.clearCart = async (req, res) => {
    try {
        await Cart.findOneAndUpdate(
            { userId: req.user.id },
            { $set: { items: [] } }, // Clear items array
            { new: true }
        );
        res.status(200).send({ message: "Cart cleared successfully" });
    } catch (error) {
        res.status(500).send({ message: "Error clearing cart", error });
    }
};

// Remove an item from the cart
exports.removeFromCart = async (req, res) => {
    const { productId } = req.params;
    try {
        const cart = await Cart.findOneAndUpdate(
            { userId: req.user.id },
            { $pull: { items: { productId } } }, // Remove the specific product from cart
            { new: true }
        );
        res.status(200).send({ message: "Item removed from cart", data: cart });
    } catch (error) {
        res.status(500).send({ message: "Error removing item from cart", error });
    }
};

// Update item quantity in the cart
exports.updateCartItem = async (req, res) => {
    const { productId } = req.params;
    const { quantity } = req.body;
    try {
        const cart = await Cart.findOneAndUpdate(
            { userId: req.user.id, "items.productId": productId },
            { $set: { "items.$.quantity": quantity } }, // Update the quantity of the specific item
            { new: true }
        );
        res.status(200).send({ message: "Cart item updated", data: cart });
    } catch (error) {
        res.status(500).send({ message: "Error updating cart item", error });
    }
};
