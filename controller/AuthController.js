const UserModal = require("../models/UserModal")
const bcrypt = require("bcrypt")



class AuthController {
    async register(req, res) {

        const { email, password: userPassword } = req.body
        if (!email || !userPassword) {
            return res.status(401).json({ message: "Invalid credentails", success: false })
        }

        try {



            const user = await UserModal.findOne({ email })

            if (user) {
                return res.status(401).json({ message: "This email is already used", success: false })
            }


            const salt = await bcrypt.genSalt(10)
            const hashed = await bcrypt.hash(userPassword, salt)

            req.body.password = hashed
            const savedUser = await UserModal.create(req.body)
            const { password, ...others } = savedUser._doc
            return res.status(200).json({ message: others, success: true })



        } catch (error) {

            return res.status(500).json({ message: error.message, success: false })
        }





    }
    async login(req, res) {

        const { email, password } = req.body
        if (!email || !password) {
            return res.status(401).json({ message: "Invalid credentails", success: false })
        }

        try {



            const user = await UserModal.findOne({ email })

            if (!user) {
                return res.status(403).json({ message: "Invalid Credentails", success: false })
            }

            const valid = await bcrypt.compare(password, user.password)

            if (valid) {
                const { password, ...others } = user._doc
                req.session.user = {
                    ...others
                }

                req.session.save(function (err) {
                    if (err) {
                        console.log("something went wrong")
                    }
                    console.log('saved in session fcuk', req.session)
                })
                return res.status(200).json({ message: others, success: true })
            } else {
                return res.status(500).json({ message: 'Invalid Credentails', success: false })

            }






        } catch (error) {
            return res.status(500).json({ message: error.message, success: false })

        }





    }





    async newPassword(req, res) {

        const { password, email } = req.body

        if (!password || !email) {
            return res.status(403).json({ message: "Invalid Credentails", success: false })
        }
        try {


            const user = await UserModal.findOne({ email })

            if (!user) return res.status(403).json({ message: "Invalid credentails", success: false })

            const salt = await bcrypt.genSalt(10)
            const hash = await bcrypt.hash(password, salt)



            const updatedUser = await UserModal.findOneAndUpdate({ _id: user._id }, { $set: { password: hash } }, { new: true, returnNewDocument: true })

            return res.status(200).json({ message: updatedUser, success: true })









        } catch (error) {

            console.log(error)

        }
    }


    async logout(req, res) {

        console.log(req.session)

        req.session?.destroy((err) => {
            if (err) {
                console.log(err)
                return res.status(200).json({ message: err, success: false })
            }
            return res.status(200).json({ message: "loggedout Successfully", success: true })
        })



    }


}






module.exports = new AuthController()