const MessageController = require("../controller/MessageController")

const router = require("express").Router()
router.post("/", MessageController.addMessage)
router.post("/new", MessageController.addNewMessage)
router.get("/:chatId", MessageController.getMessage)


module.exports = router