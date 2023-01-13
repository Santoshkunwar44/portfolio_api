const mongoose = require("mongoose")

const messageSchema = mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    content: {
        type: String,
    },
    chatId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "chat"
    }
}, { timestamps: true })


module.exports = mongoose.model("message", messageSchema)