const conversationModal = require("../models/conversation");


class ChatService {

    async addNewChat(data) {


        try {
            const savedConversation = await conversationModal.create(data)
            return savedConversation._id

        } catch (error) {
            return error.message
        }

    }

}


module.exports = new ChatService()