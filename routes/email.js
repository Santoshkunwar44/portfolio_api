const { sendEmail, resetPassword, verifyOtp } = require("../controller/Emailcontroller")
const sendMail = require("../services/emailService")

const router = require("express").Router()

router.post("/send", sendEmail)
router.post("/reset_password", resetPassword)
router.post("/verify_otp", verifyOtp)



module.exports = router