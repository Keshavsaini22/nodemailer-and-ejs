const express = require('express')
const app = express()
const port = 8000
const path = require('path')
const nodemailer = require("nodemailer");
const ejs = require('ejs')
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

//Render the ejs template
function sendEmailGeneral(to,subject){
  ejs.renderFile(__dirname + '/views/welcome.ejs',{username:"Keshav"} ,function (err, template) {
    if (err) {
      console.log('err: ', err);
    }
    else {
      const mailOptions = {
        from: {
          name: 'Keshav Saini',
          address: 'keshav.zenmonk@outlook.com'
        }, // sender address
        to: [to], // list of receivers
        subject: subject, // Subject line
        text: "Testing", // plain text body
        // html: "<b>Hello world?</b>", // html body
        html: template, // html body
  
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
      sendMail(transporter,mailOptions);
    }
  })
}

// sendEmailGeneral("keshav.1147@zenmonk.tech","Hello Bhai ✔")

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})