const Order = require("../model/order");

// Get orders for the logged-in user
exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user.id }).populate("items.productId");
        res.status(200).send({ message: "Orders fetched successfully", data: orders });
    } catch (error) {
        res.status(500).send({ message: "Error fetching orders", error });
    }
};

// Create an order
exports.createOrder = async (req, res) => {
    const { items, total } = req.body; // Ensure total is sent from frontend

    try {
        const order = new Order({
            userId: req.user.id,
            items,
            total
        });
        await order.save();
        res.status(201).send({ message: "Order created successfully", data: order });
    } catch (error) {
        res.status(500).send({ message: "Error creating order", error });
    }
};
