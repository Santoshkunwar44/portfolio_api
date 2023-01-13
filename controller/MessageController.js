const MessageModal = require("../models/MessageModal");
const { addNewChat } = require("../services/chat");

class MessageController {
    async addMessage(req, res) {
        try {
            const savedMessage = await (await (await MessageModal.create(req.body)).populate("senderId", { "password": 0 })).populate("chatId")
            res.status(200).json({ message: savedMessage, success: true })
        } catch (error) {
            res.status(500).json({ message: error.message, success: false })
        }

    }
    async getMessage(req, res) {
        const { chatId } = req.params;

        try {
            const theMessages = await MessageModal.find({ chatId }).populate("chatId").populate("senderId", { "password": 0 })
            res.status(200).json({ message: theMessages, success: true })
        } catch (error) {
            res.status(500).json({ message: error.message, success: false })
        }

    }


    async addNewMessage(req, res) {
        try {
            const chatId = await addNewChat(req.body.chat)


            let data = { ...req.body.message }
            data.chatId = chatId;
            console.log(data)
            const savedMessage = await (await (await MessageModal.create(data)).populate("senderId", { "password": 0 })).populate("chatId")
            res.status(200).json({ message: savedMessage, success: true })


        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = new MessageController()
