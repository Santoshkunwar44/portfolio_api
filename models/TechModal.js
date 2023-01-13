const mongoose = require("mongoose")


const techSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    type: {
        type: String,
        require: true
    },
    src: {
        type: String,
    },
    url: {
        type: String,
    },
    programmingLanguage: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })


module.exports = mongoose.model("tech", techSchema)