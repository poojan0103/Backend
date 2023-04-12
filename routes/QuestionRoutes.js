const questioncontroller = require('../controller/QuestionController')
const express = require("express")
var router = express.Router()

router.post('/question',questioncontroller.addQuestion)
router.get('/questionget/:survey',questioncontroller.getQuestion)
module.exports = router