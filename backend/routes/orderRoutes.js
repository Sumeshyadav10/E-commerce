const express = require("express");
const {
    createOrder,
    getOrders,
    getAllOrders,
    getOrderById,
    updateOrderStatus,
    deleteOrder,
    cancelOrder
} = require("../controllers/orderController");
const { protect, authorize } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/create", protect, createOrder); // Only logged-in users can place orders
router.get("/my-orders", protect, getOrders); // Get orders for logged-in user
router.get("/", protect, authorize("admin"), getAllOrders); // Admin fetches all orders
router.get("/:id", protect, getOrderById); // Get order by ID
router.put("/:id/status", protect, authorize("admin"), updateOrderStatus); // Update order status
router.delete("/:id", protect, authorize("admin"), deleteOrder); // Delete order (Admin only)
router.delete("/:orderID/cancel", protect, cancelOrder); // Cancel order ✅

module.exports = router;
