
const authentication = (req, res, next) => {
    const cookie = req.headers['cookie']
    if (cookie) {
        console.log(cookie)
        let cookieName = cookie.split("=")[0]
        if (cookieName === "portfolio.sid") {
            console.log("valid")
        }



        next()
    } else {
        console.log("invalid")
        next()
    }
}
module.exports = authentication 