const SurveyUserController = require('../controller/SurveyuserController')
const express = require('express')
var router = express.Router();

router.post('/add',SurveyUserController.add)
router.get('/get',SurveyUserController.getAll)
router.get('/get/:user',SurveyUserController.getbyid)

module.exports = router