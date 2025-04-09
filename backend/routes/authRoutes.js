const express = require("express");
const { registerUser, 
    loginUser,
     logoutUser,
     getAllUsers,
    getUserById,
    updateUser,
    deleteUser, } = require("../controllers/authController");
const { authMiddleware , protect, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", authMiddleware, logoutUser);

router.get("/",  getAllUsers); // Get all users
router.get("/:id", protect,isAdmin, getUserById); // Get user by ID
router.put("/:id", protect, isAdmin, updateUser); // Update user
router.delete("/:id", protect, isAdmin, deleteUser); // Delete user

module.exports = router;
