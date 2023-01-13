const TechModal = require("../models/TechModal")


class TechController {

    async addTech(req, res) {

        try {
            const savedTech = await TechModal.create(req.body)
            res.status(200).json({ message: savedTech, success: true })
        } catch (err) {
            res.status(500).json({ message: err.message, success: false })
        }

    }
    async getTechs(req, res) {


        const { type } = req.query
        let fetchedTech;


        try {
            if (!type) {
                fetchedTech = await TechModal.find({})
            } else {
                fetchedTech = await TechModal.find({
                    type: { $eq: type }
                })
            }
            res.status(200).json({ message: fetchedTech, success: true })
        } catch (err) {
            res.status(500).json({ message: err.message, success: false })
        }

    }


}
module.exports = new TechController()