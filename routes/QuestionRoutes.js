const questioncontroller = require('../controller/QuestionController')
const express = require("express")
var router = express.Router()

router.post('/qadd',questioncontroller.addquestion)

router.get('/qget/:survey',questioncontroller.getquestion)
module.exports = router