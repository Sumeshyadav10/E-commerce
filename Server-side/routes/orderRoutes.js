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
import { authMiddleware, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .post(authMiddleware, createOrder)
  .get(authMiddleware, admin, getOrders);

router.route("/myorders").get(authMiddleware, getMyOrders);

router
  .route("/:id")
  .get(authMiddleware, getOrderById)
  .put(authMiddleware, admin, updateOrderStatus);

router.route("/:id/pay").put(authMiddleware, updateOrderToPaid);

router
  .route("/:id/deliver")
  .put(authMiddleware, admin, updateOrderToDelivered);

export default router;
