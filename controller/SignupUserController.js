const singnupSchema = require("../model/SignupSchema");
const bcrypt = require("../util/Encrypt");
const message = require("../util/Message")
const _ = require("lodash");
const secertkey = "seceretkey";
const jwt = require("jsonwebtoken");
const Mail = require("../util/Mail")
const SignupSchema = require("../model/SignupSchema");
const { body, validationResult } = require("express-validator");
const cookieParser = require('cookie-parser'); 
const { response } = require("express");





exports.signup = async (req, res) => {
  
// let lastid = await singnupSchema.find().sort({ _id: -1 }).limit(1);
// let newid = lastid[0]["userid"] === undefined || lastid[0]["userid"] === 0
//  ? 1
// : lastid[0]["userid"] + 1;
  try {
    const { name, email, password, gender, phone } = req.body;

    let hash = await bcrypt.hashPassword(req.body.password);
    const user =  singnupSchema({
      // userid:newid,
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
        message:message.alreadyexist,
      });
    }

    const userData = await user.save();
    if (userData) {
      Mail.sendverifyMail(userData.name, userData.email, userData._id);

      res.status(200).json({
        message: message.userCreate,
        user: user,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: message.error,
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
  
    res.redirect("https://mysurvey-builder.netlify.app/#/verified");
  } catch (error) {
    res.status(500).json({
      message: message.error,
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
        message: message.InvalidPass,
      });
    }
    const isMatch = await bcrypt.comparePassword(password, user.password);
    if (!isMatch) {
      return res.json({
        message: message.InvalidPass,
      });
    }
    if (user.is_verified == 0) {
      return res.json({
        message: message.verifyemail,
      });
    }
    const token = jwt.sign(
      {
        _id: user._id,
      },
      secertkey,
      { expiresIn: "2h" }
    );
    // res.cookie(token)
      res.setHeader('set-cookie',`token=${token};HttpOnly;path=/;`);
     

      res.status(200).json({
      message: message.login,
      token: token,
      user: user,
    });
  } catch (error) {
    res.json({
      message: message.error,
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
      message: message.error,
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
      message: message.error,
      error: error.message,
    });
  }
};
exports.updatepoints = async (req, res) => {
  try {
    let userdata = await SignupSchema.find({ _id: req.body.id });
  
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
      message: message.points,
      user,
    });
    
  } catch (error) {
    res.status(500).json({
      message: message.error,
      error: error.message,
    });
  }
};

exports.redemPoints = async (req, res) => {
  try {
    let userdata = await singnupSchema.find({ _id: req.body.id });
   
    let user = await singnupSchema.updateOne(
      { _id: req.body.id },
      { $set: { points: 0 } }
    );
    res.status(200).json({
      message: message.points,
      user,
    });
   
  } catch (error) {
    res.status(500).json({
      message:message.error,
      error: error.message,
    });
  }
};
exports.update = async(req,res)=>{
  try {
    
    let user = await singnupSchema.
    updateOne({ _id: req.body._id },
      { $addToSet: {
        survey:req.body.survey
      
      
      }
      });
    res.status(200).json({
      message:"added",
      user,
      
    });
    // console.log(user);
  } catch (error) {
    res.status(500).json({
      message: message.error,
      error: error
      .message,
    });
  }
}

exports.find = async(req,res)=>{
  const _id = req.params._id;
  singnupSchema.find({_id:_id}).populate("survey")
  .then(data=>{
    res.send(data)
   
})
.catch(err=>{
    res.send(err)
    
    (err)
})
}

  



