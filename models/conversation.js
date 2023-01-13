const mongoose = require("mongoose")

const chatSchema = mongoose.Schema({
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    chatName: {
        type: String,
    },
    isGroupChat: {
        type: Boolean,
        default: false
    },
    latestMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "message"
    }
}, { timestamps: true })


module.exports = mongoose.model("chat", chatSchema)
