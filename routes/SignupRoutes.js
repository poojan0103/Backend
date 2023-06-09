const signupController = require('../controller/SignupUserController')
const express = require("express")
var router = express.Router();
const { body, validationResult } = require('express-validator');
const SignupSchema = require('../model/SignupSchema');



router.post('/signup',
body('email').isEmail(),
body('name').isLength({min: 3}),
body('password').isLength({min:6}),
body('phone').isLength({min:10}),
body('gender'),signupController.signup)
router.post('/login',signupController.login)
router.get('/verify',signupController.verifyUser)
router.get('/profile',signupController.verifytoken,signupController.userProfile)
router.post('/points',signupController.updatepoints)
router.post('/redem',signupController.redemPoints)
router.post('/update',signupController.update)
router.get('/get/:_id',signupController.find)
module.exports = router