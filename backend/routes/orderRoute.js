const express = require('express');
const router = express.Router();
const { createOrder, getOrder, updateOrder, deleteOrder, getAllOrders } = require('../controller/orderController');

// Routes
router.route('/orders').post(createOrder);       // Create a new order
router.route('/orders/:id').get(getOrder);       // Get order by ID
router.route('/orders').get(getAllOrders);      // Get all orders
router.route('/orders/:id').put(updateOrder);    // Update order by ID
router.route('/orders/:id').delete(deleteOrder); // Delete order by ID

module.exports = router;
