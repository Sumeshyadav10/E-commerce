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
import { authenticateToken, admin, authMiddleware , protect, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/admin").post(registerUser).get(authenticateToken, admin, getUsers);
// changes by sumesh

router
  .route("/:id")
  .get(authenticateToken,protect, admin, getUserById)
  .put(authenticateToken, protect, admin, updateUser)
  .delete(authenticateToken, protect, admin, deleteUser);


  router.post("/register", registerUser);
  router.post("/login", loginUser);
  router.post("/logout", authMiddleware, logoutUser);
  router.get("/",  getAllUsers); // Get all users
  
export default router;
