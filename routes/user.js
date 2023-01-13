const UserController = require("../controller/UserController")

const router = require("express").Router()

router.get("/admin", UserController.getAdmin)
router.put("/:userId", UserController.updateUser)
router.get("/loggedUser", UserController.loggedInUser)



module.exports = router