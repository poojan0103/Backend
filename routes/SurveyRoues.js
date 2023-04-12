const SurveyController = require('../controller/SurveyController')
const express = require("express")
var router = express.Router();
    

router.post('/addsurvey',SurveyController.addSurvey)
router.get('/getsurvey',SurveyController.getSurvey)


module.exports = router