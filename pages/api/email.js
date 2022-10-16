import axios from "axios"
const nodemailer = require("nodemailer")

export default async function handler(req, res) {
  let transporter = nodemailer.createTransport({
    host: "smtp.yandex.com",
    port: 465,
    secure: true,
    auth: {
      user: "keerthigan@yandex.com",
      pass: "8wFjHgxL85*",
    },
    secureConnection: true,
    tls: {
      secureProtocol: "TLSv1_method",
    },
  })

  let mailOptions = {
    from: " <keerthigan85@gmail.com>",
    to: "keerthigan@yandex.com",
    subject: "test",
    text: "test node",
  }

  transporter.sendMail(mailOptions, (err, success) => {
    if (err) {
      console.log(err)
      res.json({ send: false })
    } else {
      console.log(success)
      console.log("email been sent")
      res.json({ send: true })
    }
  })
}
