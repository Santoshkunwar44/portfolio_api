const { default: mongoose, Mongoose } = require("mongoose");
const ProjectModal = require("../models/ProjectModal");
const TechModal = require("../models/TechModal");

class ProjectController {

    async addProject(req, res) {

        try {

            const savedProject = await ProjectModal.create(req.body)
            res.status(200).json({ message: savedProject, success: true })


        } catch (error) {
            res.status(500).json({ message: error.message, success: false })

        }

    }

    async getProjects(req, res) {
        const query = req.query.tools;
        let queryArr;

        if (query) {
            if (query.includes('_')) {
                queryArr = query.split('_')
            } else {
                queryArr = [query]
            }
        }

        console.log("the query arr ", queryArr)

        try {
            if (queryArr) {

                const fetchedProject = await ProjectModal.find({
                    usedTools: { $all: queryArr }
                })

                return res.status(200).json({ message: fetchedProject, success: true })
            } else {

                const fetchedProjects = await ProjectModal.find({})
                return res.status(200).json({ message: fetchedProjects, success: true })

            }
        } catch (error) {
            res.status(500).json({ message: error.message, success: false })

        }

    }
    async getAProject(req, res) {

        const projectId = req.params.id

        if (!projectId) {
            return res.status(402).json({ message: "invalid param", success: false })
        }

        const theProject = await ProjectModal.findById(projectId)


        try {
            const fetchedProject = await ProjectModal.aggregate([
                {
                    $match: { _id: new mongoose.Types.ObjectId(projectId) }
                },
                {
                    $project: {
                        _id: "$name",
                        avgRating: { $avg: '$ratings.rating' }

                    }
                }
            ])
            return res.status(200).json({ message: { ...theProject._doc, avgRating: fetchedProject[0].avgRating }, success: true })

        } catch (error) {
            res.status(500).json({ message: error.message, success: false })
        }
    }

    async ProjectUsedTools(req, res) {
        const tools = req.query.tools;

        try {

            const theDataa = await ProjectModal.aggregate([
                {
                    $match: { usedTools: { $in: [tools] } }
                }
            ])
            res.status(200).json({ message: theDataa, success: true })

        } catch (error) {
            console.log(error.message)
            res.status(500).json({ message: error.message, success: false })
        }

    }



    async ProjectFilter(req, res) {
        const { limit, sort, type, tools, rating } = req.body



        let pipelines = []

        if (rating) {
            pipelines.push({
                $project: {
                    name: 1,
                    desc: 1,
                    type: 1,
                    url: 1,
                    mainImg: 1,
                    ratings: 1,
                    usedTools: 1,
                    avgRating: { $avg: "$ratings.rating" }
                },
            })
        }


        if (rating && tools && type) {

            pipelines.push({
                $match: {
                    avgRating: { $gte: +rating },
                    type: { $in: type },
                    usedTools: { $in: tools }
                }
            })
        } else if (rating && tools) {

            pipelines.push({
                $match: {
                    avgRating: { $gte: +rating },
                    usedTools: { $in: tools }
                }
            })

        } else if (rating && type) {
            pipelines.push({
                $match: {
                    avgRating: { $gte: +rating },
                    type: { $in: type }
                }
            })
        } else if (type && tools) {

            pipelines.push({
                $match: {
                    type: { $in: type },
                    usedTools: { $in: tools }
                }
            })
        } else if (type) {
            pipelines.push({
                $match: {
                    type: { $in: type },
                }
            })
        } else if (tools) {
            pipelines.push({
                $match: {
                    usedTools: { $in: tools }
                }
            })
        } else if (rating) {
            pipelines.push({
                $match: {
                    avgRating: { $gte: +rating },
                }
            })
        }

        if (sort) {
            pipelines.push({
                $sort: {
                    createdAt: +sort, _id: +sort
                }
            })
        }

        if (limit) {
            pipelines.push({
                $limit: +limit
            })
        }

        if (pipelines.length === 0) {
            pipelines.push(
                {
                    $project: {
                        currentFeatures: 0
                    }
                })
        }

        try {
            const filteredProjects = await ProjectModal.aggregate(pipelines)
            console.log(filteredProjects)
            res.json({ message: filteredProjects, success: true })

        } catch (error) {
            console.log(error.message)

        }
    }




    async getCategories(req, res) {

        try {
            const categories = await ProjectModal.aggregate([
                {
                    $project: { type: 1, _id: 0 }
                }

            ])
            return res.json({ message: categories, success: true })
        } catch (error) {
            console.log(error)

        }
    }

    async getFrontendPieChatData(req, res) {

        try {

            const data = await ProjectModal.aggregate([



                {
                    $unwind: "$usedTools"
                },
                {
                    $group: {
                        _id: "$usedTools",
                        count: { $sum: 1 }
                    }

                }

            ])
            res.json({ message: data, success: true })
        } catch (error) {
            console.log(error)

        }

    }



    async updateProject(req, res) {
        const projectId = req.params.id
        if (!projectId) {
            return res.status(402).json({ message: "Invalid credentails", success: false })
        }
        try {
            const updatedData = await ProjectModal.findOneAndUpdate(
                {
                    _id: projectId
                },
                {
                    $set: req.body
                },
                {
                    new: true
                })
            res.status(200).json({ message: updatedData, success: true })
        } catch (error) {
            console.log(error.message)

            res.status(500).json({ message: error.message, success: false })
        }
    }








    async rating(req, res) {
        const projectId = req.params.id
        const { rating, userId } = req.body
        try {


            const Project = await ProjectModal.findById(projectId)
            const hasRated = Project.ratings.find((item) => item.userId == userId)
            if (!hasRated) {
                const savedProduct = await ProjectModal.findOneAndUpdate(
                    { _id: projectId },
                    { $push: { ratings: { userId, rating } } },
                    { returnOriginal: false }
                )
                return res.status(200).send({ message: savedProduct, success: true })
            } else {


                // changing the previous rating  whose ratings userId is  user id is userId
                const saved = await ProjectModal.findOneAndUpdate(
                    { _id: projectId },
                    { $set: { "ratings.$[element].rating": rating } },
                    {
                        arrayFilters: [
                            { "element.userId": userId }
                        ],
                        returnOriginal: false
                    }
                )
                res.status(200).send({ message: saved, success: true })
            }



        } catch (error) {
            console.log(error)
            res.status(500).json({ message: error, success: false })
        }
    }


    async SortWithRatings(req, res) {


        try {
            const data = await ProjectModal.aggregate([
                {


                    $project: {
                        name: 1,
                        desc: 1,
                        type: 1,
                        avgRating: { $avg: "$ratings.rating" }
                    }
                }
            ])
            return res.json({ message: data })
        } catch (error) {
            console.log(error)

        }

    }
}



module.exports = new ProjectController()