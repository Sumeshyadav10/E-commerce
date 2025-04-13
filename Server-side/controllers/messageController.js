import asyncHandler from "express-async-handler";
import Message from "../models/messageModel.js";
import ApiResponse from "../utils/apiResponse.js";
import apiError from "../utils/apiError.js";

// @desc    Create new message
// @route   POST /api/messages
// @access  Private
// const createMessage = asyncHandler(async (req, res) => {
//   const { recipient, subject, content, attachments, priority } = req.body;

//   const message = new Message({
//     sender: req.user._id,
//     recipient,
//     subject,
//     content,
//     attachments,
//     priority,
//   });

//   const createdMessage = await message.save();
//   res.status(201).json(createdMessage);
// });

const sendMessage = asyncHandler(async (req, res) => {
  const { subject, content } = req.body;

  if (!content) {
    res.status(400);
    throw new Error("Message content cannot be empty");
  }

  // Handle attachments if any
  const attachments = req.files ? req.files.map((file) => file.path) : [];

  // Create a new message
  const newMessage = await Message.create({
    customer: req.user._id,
    message: content,
    subject,
    attachments, // Save attachment URLs
  });

  res.status(201).json({ message: "Message sent successfully", data: newMessage });
});
// @desc    Get all messages for logged in user
// @route   GET /api/messages
// @access  Private
const getMessages = asyncHandler(async (req, res) => {
  const messages = await Message.find({
    $or: [{ sender: req.user._id }, { recipient: req.user._id }],
  })
    .populate("sender", "name email")
    .populate("recipient", "name email")
    .sort("-createdAt");

  res.json(messages);
});

// @desc    Get message by ID
// @route   GET /api/messages/:id
// @access  Private
const getMessageById = asyncHandler(async (req, res) => {
  const message = await Message.findById(req.params.id)
    .populate("sender", "name email")
    .populate("recipient", "name email");

  if (message) {
    // Mark message as read if recipient is viewing
    if (
      message.recipient._id.toString() === req.user._id.toString() &&
      !message.isRead
    ) {
      message.isRead = true;
      await message.save();
    }
    res.json(message);
  } else {
    res.status(404);
    throw new Error("Message not found");
  }
});

// @desc    Update message
// @route   PUT /api/messages/:id
// @access  Private
const updateMessage = asyncHandler(async (req, res) => {
  const message = await Message.findById(req.params.id);

  if (message) {
    message.subject = req.body.subject || message.subject;
    message.content = req.body.content || message.content;
    message.attachments = req.body.attachments || message.attachments;
    message.priority = req.body.priority || message.priority;
    message.isRead =
      req.body.isRead !== undefined ? req.body.isRead : message.isRead;

    const updatedMessage = await message.save();
    res.json(updatedMessage);
  } else {
    res.status(404);
    throw new Error("Message not found");
  }
});

// @desc    Delete message
// @route   DELETE /api/messages/:id
// @access  Private
const deleteMessage = asyncHandler(async (req, res) => {
  const message = await Message.findById(req.params.id);

  if (message) {
    // Only allow sender or recipient to delete
    if (
      message.sender.toString() === req.user._id.toString() ||
      message.recipient.toString() === req.user._id.toString()
    ) {
      await message.deleteOne();
      res.json({ message: "Message removed" });
    } else {
      res.status(401);
      throw new Error("Not authorized to delete this message");
    }
  } else {
    res.status(404);
    throw new Error("Message not found");
  }
});

// @desc    Get unread message count
// @route   GET /api/messages/unread/count
// @access  Private
const getUnreadCount = asyncHandler(async (req, res) => {
  const count = await Message.countDocuments({
    recipient: req.user._id,
    isRead: false,
  });
  res.json({ count });
});

export {
  // createMessage,
  sendMessage,
  getMessages,
  getMessageById,
  updateMessage,
  deleteMessage,
  getUnreadCount,
};
