const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
    {
        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        message: {
            type: String,
            required: true
        },
        status: {
            type: String,
            enum: ["unread", "read"],
            default: "unread"
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Message", MessageSchema);
