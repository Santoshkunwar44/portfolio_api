const router = require("express").Router()
const ProjectController = require("../controller/ProjectController")

router.get("/projectData", ProjectController.getFrontendPieChatData)
router.post("/ratingssort", ProjectController.SortWithRatings)
router.get("/categories", ProjectController.getCategories)
router.post("/filter", ProjectController.ProjectFilter)
router.get("/", ProjectController.getProjects)
router.get("/find", ProjectController.ProjectUsedTools)
router.get("/:id", ProjectController.getAProject)
router.post("/", ProjectController.addProject)
router.post("/rating/:id", ProjectController.rating)
router.put("/:id", ProjectController.updateProject)


module.exports = router 