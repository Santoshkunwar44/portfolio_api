const router = require("express").Router()
const AuthController = require("../controller/AuthController")

router.post("/login", AuthController.login)
router.post("/register", AuthController.register)
router.post("/new_password", AuthController.newPassword)
router.post("/logout", AuthController.logout)
module.exports = router