const tryCatcherror = require("../Middleware/tryCatcherror");
const Order = require("../models/orderModel");
// Order///////

// Create a new order
exports.createOrder = tryCatcherror(async (req, res) => {
  const order = await Order.create(req.body);

  res.status(201).json({ 
    success: true,
    message:"order Successfully"
});
res.status(400).json({ 
    success: false,
     message: "error.message" });
});

// Get a single order
exports.getOrder = tryCatcherror (async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user orderItems.product"
    );
    if (!order)
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    res.status(200).json({ success: true, order });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Get all orders
exports.getAllOrders =  tryCatcherror(async (req, res) => {
  try {
    const orders = await Order.find().populate("user");
    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Update an order
exports.updateOrder = tryCatcherror(async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!order)
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    res.status(200).json({ success: true, order });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Delete an order
exports.deleteOrder = tryCatcherror(async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order)
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    res.status(200).json({ success: true, message: "Order deleted" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});
