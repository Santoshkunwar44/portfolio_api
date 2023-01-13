const UserModal = require("../models/UserModal");

class UserController {
    async getAdmin(req, res) {



        try {




            const theAdmin = await UserModal.findOne({ isAdmin: true })
            res.status(200).json({ message: theAdmin, success: true })


        } catch (error) {
            res.status(500).json({ message: error.message, success: false })

        }

    }



    async updateUser(req, res) {
        const theUserId = req.params.userId
        try {
            const updatedUser = await UserModal.findByIdAndUpdate(theUserId, {
                $set: req.body
            }, {
                new: true,
            })
            res.status(200).json({ message: updatedUser, success: true })

        } catch (error) {
            res.status(500).json({ message: error.message, success: false })

        }
    }



    // logged In user 


    async loggedInUser(req, res) {
        const passportSessionUser = req.session.passport?.user
        const sessionUser = req.session?.user
        if (passportSessionUser) {
            return res.status(200).json({ message: passportSessionUser, success: true })
        } else if (sessionUser) {
            return res.status(200).json({ message: sessionUser, success: true })
        } else {
            return res.status(401).json({ message: "User has not Logged IN", success: true })
        }
    }
}






module.exports = new UserController()