const express = require('express')
const app = express()
const port = 8000
const path = require('path')
const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  // service:'gmail',
  service: "hotmail",
  // host: "smtp.gmail.com",
  host: "smtp-mail.outlook.com",
  secureConnection: false, // use SSL
  port: 587, // port for secure SMTP
  auth: {
    // user: "keshavsainikesu@gmail.com",
    user: "keshav.zenmonk@outlook.com",
    pass: process.env.pass,
  },
  tls: {
    ciphers: 'SSLv3'
  }
});

const mailOptions = {
  from: {
    name: 'Keshav Saini',
    address: 'keshav.zenmonk@outlook.com'
  }, // sender address
  to: ["keshav.1147@zenmonk.tech"], // list of receivers
  subject: "Hello ✔", // Subject line
  text: "Testing", // plain text body
  html: "<b>Hello world?</b>", // html body
  // attachments: [
  //   {
  //     // filename: 'ccc.png',
  //     // path: path.join(__dirname, 'ccc.png'),
  //     // contentType: 'image/png'
  //   }
  // ]
}

const sendMail = async (transporter, mailOptions) => {
  try {
    await transporter.verify();
    await transporter.sendMail(mailOptions);
    console.log("success!")
  } catch (error) {
    console.log('error: ', error);
  }
}

// sendMail(transporter,mailOptions);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})