require('dotenv').config();
const malier = require("nodemailer"); 

const sendverifyMail = async (name, email, user_id) => {
    try {
      const transporter = malier.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
      });
    
      const mailOptions = {
        from: "",
        to: email,
        subject: "verify your email",
        text: "verify your email",
        html: `<h1>Welcome ${name}</h1><p>Please click on the link below to verify your
              email address</p><p><a href="https://survey-app-mxek.onrender.com/verify?id=${user_id}">Verify</a></p>`,
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
      
        } else {
          console.log("Email sent: " + info.response);
        }
      });
    } catch (error) {
      
    }
  };
  module.exports={sendverifyMail}