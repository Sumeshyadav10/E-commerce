import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getUsers,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import {
  authenticateToken,
  admin,
  authMiddleware,
  protect,
  isAdmin,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(registerUser).get(authMiddleware, admin, getUsers);
// changes by sumesh

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", authMiddleware, logoutUser);
router.get("/all", authMiddleware, getAllUsers); // Get all users
router.get("/me", authMiddleware, getUsers);


router
  .route("/:id")
  .patch(authMiddleware, protect, admin, updateUser)
  .delete(authMiddleware, protect, admin, deleteUser);


export default router;
