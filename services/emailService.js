const nodeMailer = require("nodemailer")

async function sendMail({ from, subject, text, html, to }) {

    console.log(from, subject, text, to)

    let transporter = nodeMailer.createTransport({
        host: "smtp-relay.sendinblue.com",
        port: 587,
        secure: false,

        auth: {
            user: "santehero8@gmail.com",
            pass: "Ar5Mjcf18mWQSYGN"
        }
    })


    try {

        let info = await transporter.sendMail({
            from,
            to: to ? to : "igetwhatido@gmail.com",
            subject,
            text,
            html,

        })
        return info




    } catch (error) {
        console.log(error)

    }


}



module.exports = sendMail