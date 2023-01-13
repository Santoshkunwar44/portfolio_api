const mongoose = require("mongoose")


const projectSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    type: {
        type: Array,
        require: true
    },
    desc: {
        type: String,
        require: true,
    },
    sourceCode: String,
    url: String,
    mainImg: String,
    ratings: [
        {

            userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
            rating: Number,
        }
    ],
    darkMode: {
        type: String,
        default: false
    },
    platForm: String,
    pages: Array,
    currentFeatures: Array,
    upcomingFeatures: Array,
    usedTools: Array,
    platForm: String,




}, { timestamps: true })


module.exports = mongoose.model("project", projectSchema)