const { addChat, getChats } = require("../controller/ChatController")
const router = require("express").Router()
router.post("/", addChat)
router.get("/:userId", getChats)

module.exports = router