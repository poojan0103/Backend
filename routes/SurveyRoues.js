const SurveyController = require('../controller/SurveyController')
const express = require("express")
var router = express.Router();
    

router.post('/survey',SurveyController.addSurvey)
router.get('/survey',SurveyController.getSurvey)
router.get('/survey/:user/:survey',SurveyController.checkSurvey)

module.exports = router