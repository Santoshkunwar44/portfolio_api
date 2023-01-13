const express = require("express")
const app = express()
const morgan = require("morgan")
const session = require("express-session")
require("dotenv").config()
const cors = require("cors")
const passport = require("passport")
const MongoStore = require("connect-mongo")



var cookieParser = require('cookie-parser');
const checkSessionUser = require("./middleware/sessionUserCheck")




require("./services/connectDb")()
require("./utility/passport")

const store = MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    autoRemove: 'native',
    ttl: 1000 * 60 * 60 * 10,
    collectionName: "portfoilio_session"
})


// middlewares
app.use(express.json())
app.use(morgan("dev"))
app.use(cookieParser())
app.use(cors({
    origin: "*",
    methods: ["POST,PUT,GET,DELETE"],
    credentials: true,
}))
app.use(session({
    name: "portfolio.sid",
    secret: process.env.session_secret,
    resave: false,
    store,
    saveUninitialized: false,
    cookie: {

        cookie: {
            secure: true,
            maxAge: 1000 * 60 * 60 * 24 * 7,
            httpOnly: true,
            sameSite: "none"
        },
    },
}))

// application level middeleware

app.use(checkSessionUser)
app.use(passport.initialize())
app.use(passport.session())

// endpoints

app.use('/api/auth', require("./routes/auth"))
app.use('/api/tools', require("./routes/tech"))
app.use('/api/user', require("./routes/user"))
app.use('/api/project', require("./routes/project"))
app.use("/api/chat", require("./routes/chat"))
app.use("/api/message", require("./routes/message"))
app.use("/api/passport", require("./routes/passport"))
app.use("/api/email", require("./routes/email"))





const PORT = process.env.PORT || 8080
app.listen(PORT, () => console.log(`server started at port ${PORT}`))



