const router = require("express").Router()
const TechController = require('../controller/TechController')


router.get("/", TechController.getTechs)
router.post("/", TechController.addTech)

module.exports = router