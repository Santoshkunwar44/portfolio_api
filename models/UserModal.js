const mongoose = require("mongoose")


const userSchema = mongoose.Schema({
    username: {
        type: String
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    src: {
        type: String,
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    loginMethod: {
        type: String,
        default: "app"
    },
    lastLoggedIn: {
        type: Date
    },
    password: {
        type: String,
        require: false

    }




}, { timestamps: true })


module.exports = mongoose.model("user", userSchema)