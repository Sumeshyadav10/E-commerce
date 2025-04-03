const Message = require("../models/Message");
const asyncHandler = require("../utils/asynchandler");
const apiError = require("../utils/ApiError");
const ApiResponse = require("../utils/apiResponse");

//  Customer sends a message
const sendMessage = asyncHandler(async (req, res, next) => {
    const { message } = req.body;
    const customerId = req.user._id; // Logged-in user

    if (!message) {
        throw new apiError(400, "Message cannot be empty");
    }

    const newMessage = await Message.create({
        customer: customerId,
        message
    });

    res.status(201).json(new ApiResponse(201, "Message sent successfully", newMessage));
});

//  Admin gets all messages
const getMessages = asyncHandler(async (req, res, next) => {
    const messages = await Message.find().populate("customer", "name email").sort({ createdAt: -1 });

    res.status(200).json(new ApiResponse(200, "Messages retrieved successfully", messages));
});

// Admin marks a message as read
const markMessageAsRead = asyncHandler(async (req, res, next) => {
    const { messageId } = req.params;

    const message = await Message.findById(messageId);
    if (!message) {
        throw new apiError(404, "Message not found");
    }

    message.status = "read";
    await message.save();

    res.status(200).json(new ApiResponse(200, "Message marked as read", message));
});

module.exports = {
    sendMessage,
    getMessages,
    markMessageAsRead
};