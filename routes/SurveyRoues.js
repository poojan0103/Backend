const SurveyController = require('../controller/SurveyController')
const express = require("express")
var router = express.Router();
    

router.post('/add',SurveyController.addsurvey)
router.get('/get',SurveyController.getsurvey)


module.exports = router