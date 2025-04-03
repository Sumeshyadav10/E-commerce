const express = require("express");
const { sendMessage, getMessages, markMessageAsRead } = require("../controllers/messageController");
const { protect, authorize } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", protect, sendMessage); // Customer sends message
router.get("/", protect, authorize("admin"), getMessages); // Admin gets messages
router.put("/:messageId/read", protect, authorize("admin"), markMessageAsRead); // Admin marks message as read

module.exports = router;

