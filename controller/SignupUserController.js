const singnupSchema = require("../model/SignupSchema");
const bcrypt = require("../util/Encrypt");
const _ = require("lodash");
const secertkey = "seceretkey";
const jwt = require("jsonwebtoken");
const malier = require("nodemailer");
const SignupSchema = require("../model/SignupSchema");
const { body, validationResult } = require("express-validator");

const sendverifyMail = async (name, email, user_id) => {
  try {
    const transporter = malier.createTransport({
      service: "gmail",
      auth: {
        user: "",
        pass: "",
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

exports.signup = async (req, res) => {
  try {
    const { name, email, password, gender, phone } = req.body;

    let hash = await bcrypt.hashPassword(req.body.password);
    const user = new singnupSchema({
      name,
      email,
      password: hash,
      gender,
      phone,
    });

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({
        errors: errors.array(),
      });
    }
    const userExist = await singnupSchema.findOne({ email: email });
    if (userExist) {
      return res.json({
        message: "User already exist",
      });
    }

    const userData = await user.save();
    if (userData) {
      sendverifyMail(userData.name, userData.email, userData._id);

      res.status(200).json({
        message: "User created successfully",
        user: user,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

exports.verifyUser = async (req, res) => {
  try {
    const user = await singnupSchema.updateOne(
      { _id: req.query.id },
      { $set: { is_verified: 1 } }
    );
    console.log(user);
    res.redirect("http://localhost:4200/login");
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await singnupSchema.findOne({ email: email });
    if (!user) {
      return res.json({
        message: "Invalid email or password",
      });
    }
    const isMatch = await bcrypt.comparePassword(password, user.password);
    if (!isMatch) {
      return res.json({
        message: "Invalid email or password",
      });
    }
    if (user.is_verified == 0) {
      return res.json({
        message: "Please verify your email",
      });
    }
    const token = jwt.sign(
      {
        _id: user._id,
      },
      secertkey,
      { expiresIn: "1h" }
    );
    res.status(200).json({
      message: "User logged in successfully",
      token: token,
      user: user,
    });
  } catch (error) {
    res.json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

exports.verifytoken = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        message: "Auth failed",
      });
    }
    const decoded = jwt.verify(token, secertkey);
    req._id = decoded._id;
    next();
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

exports.userProfile = async (req, res, next) => {
  try {
    const user = await singnupSchema.findOne({ _id: req._id });
    res.status(200).json({
      user: _.pick(user, [
        "_id",
        "name",
        "email",
        "gender",
        "phone",
        "points",
        "totalsurvey",
      ]),
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};
exports.updatepoints = async (req, res) => {
  try {
    let userdata = await SignupSchema.find({ _id: req.body.id });
    console.log(userdata);
    let user = await singnupSchema.updateOne(
      { _id: req.body.id },
      {
        $set: {
          points: userdata[0]["points"] + parseInt(req.body.points),
          totalsurvey: userdata[0]["totalsurvey"] + 1,
        },
      }
    );
    res.status(200).json({
      message: "Points updated successfully",
      user,
    });
    console.log(user);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

exports.redemPoints = async (req, res) => {
  try {
    let userdata = await singnupSchema.find({ _id: req.body.id });
    console.log(userdata);
    let user = await singnupSchema.updateOne(
      { _id: req.body.id },
      { $set: { points: 0 } }
    );
    res.status(200).json({
      message: "Points updated successfully",
      user,
    });
    console.log(user);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};
