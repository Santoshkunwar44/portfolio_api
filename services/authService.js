const UserModal = require("../models/UserModal")
const bcrypt = require("bcrypt")

class AuthService {

    async createGoogleUser(user) {
        if (user) {
            const { email } = user
            try {
                const User = await UserModal.findOne({ email })
                if (User) {
                    return User
                } else {
                    const salt = await bcrypt.genSalt(10)
                    const hashedPassword = await bcrypt.hash(user.username, salt)
                    user.password = hashedPassword
                    const User = await UserModal.create(user)
                    return User
                }
            } catch (error) {
                console.log(error)
            }
        }

    }

}

module.exports = new AuthService()


