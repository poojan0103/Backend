const malier = require("nodemailer"); 

const sendverifyMail = async (name, email, user_id) => {
    try {
      const transporter = malier.createTransport({
        service: "gmail",
        auth: {
          user: "d64810258@gmail.com",
          pass: "yromarlhqtvmsqfs",
        },
      });
      const mailOptions = {
        from: "",
        to: email,
        subject: "verify your email",
        text: "verify your email",
        html: `<h1>Welcome ${name}</h1><p>Please click on the link below to verify your
              email address</p><p><a href="http://localhost:3000/verify?id=${user_id}">Verify</a></p>`,
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  module.exports={sendverifyMail}