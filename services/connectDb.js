const { default: mongoose } = require("mongoose")

const connectDb = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI)
        console.log(`connected to mongo ${connect.connection.host}`)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }

}
module.exports = connectDb