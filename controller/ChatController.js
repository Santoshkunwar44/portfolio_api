const conversation = require("../models/conversation");

class ChatController {
    async addChat(req, res) {

        const { users } = req.body
        try {
            const theChat = await conversation.findOne(
                {
                    users: { $all: users }
                }
            )
            console.log(theChat)
            if (theChat) {
                return res.status(403).json({ message: "the conversation alrady exits", success: false })
            }
            const savedChat = await conversation.create(req.body)
            res.status(200).json({ message: savedChat, success: true })
        } catch (error) {
            res.status(500).json({ message: error.message, success: false })
        }

    }
    async getChats(req, res) {

        const { userId } = req.params

        try {
            const theChat = await conversation.findOne(
                {
                    users: { $in: [userId] }
                }
            ).populate("users", { "password": 0 })
            if (theChat) {
                res.status(200).json({ message: theChat, success: true })

            } else {
                res.status(500).json({ message: "No Chats yet", success: false })

            }
        } catch (error) {
            res.status(500).json({ message: error.message, success: false })
        }

    }
}

module.exports = new ChatController()

