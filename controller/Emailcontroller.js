const UserModal = require("../models/UserModal")
const emailTemplate = require("../services/emailTemplate")
const hashService = require("../services/hashService")
const otpServices = require("../services/otpServices")
const resetPasswordTemplete = require("../services/resetPasswordTemplete")

class EmailController {


    async sendEmail(req, res) {

        const { message: text, from } = req.body

        try {

            const sendMail = require("../services/emailService")
            await sendMail({
                from,
                subject: `${from} sent you a message`,
                text,
                html: emailTemplate({
                    from,
                    text
                })
            })

            return res.status(200).json({ message: "Email sent successfully ", success: true })


        } catch (error) {

            console.log("the error ", error)
            return res.status(500).json({ message: "Something went wrong !!", success: true })

        }



    }



    // password reset 


    async resetPassword(req, res) {

        const { email } = req.body
        console.log(email)


        try {

            const User = await UserModal.findOne({ email })

            if (!User) return res.status(403).json({ message: "This email was not used while registering..", success: false })




            const code = await otpServices.generateOtp()
            const ttl = 1000 * 60 * 5 // 5min
            const expires = Date.now() + ttl;
            const data = `${email}.${code}.${expires}`;
            const hash = await hashService.generateHash(data)




            const sendMail = require("../services/emailService")
            const from = process.env.ADMIN_EMAIL
            const text = code.toString()
            const to = email



            await sendMail({
                from,
                subject: `Reset Password`,
                text,
                html: resetPasswordTemplete({
                    from,
                    text
                })
                ,
                to,
            })


            try {
                // await otpService.sendBySms(email, otp)
                res.status(200).json({ message: { hashed: `${hash}.${expires}`, email, code }, success: true })

            } catch (error) {

                res.status(500).json({ message: error, success: false })
            }

        } catch (error) {

            console.log("the error ", error)
            return res.status(500).json({ message: "Something went wrong !!", success: true })

        }



    }


    // verifiy confirmation code 


    async verifyOtp(req, res) {

        console.log(req.body)

        const { otp, hash, email } = req.body;
        if (!otp || !hash || !email) {
            return res.status(403).json({ message: "invalid credentials", success: false })
        }


        const [hashOtp, expires] = hash.split('.')
        let dateNow = new Date().getTime()
        if (dateNow > +expires) {
            return res.status(401).json({ message: "Otp is expired", success: false })
        }


        const data = `${email}.${otp}.${expires}`;
        const isValid = otpServices.verifyOtp(data, hashOtp)

        if (!isValid) {
            return res.status(403).json({ message: " otp is invalid", success: false })
        }



        res.json({ message: "confirmation code is valid" })



    }




}
module.exports = new EmailController()