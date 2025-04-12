import express from "express";
import {
  createOrder,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";
import { authenticateToken, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .post(authenticateToken, createOrder)
  .get(authenticateToken, admin, getOrders);

router.route("/myorders").get(authenticateToken, getMyOrders);

router
  .route("/:id")
  .get(authenticateToken, getOrderById)
  .put(authenticateToken, admin, updateOrderStatus);

router.route("/:id/pay").put(authenticateToken, updateOrderToPaid);

router
  .route("/:id/deliver")
  .put(authenticateToken, admin, updateOrderToDelivered);

export default router;
