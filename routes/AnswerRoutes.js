const answerController = require('../controller/AnswerController')
const express = require('express')
const router = express.Router()

router.post('/ans',answerController.addanswers)
router.get('/aget',answerController.getanswers)
router.get('/aget/:_id',answerController.getanswer)
router.put('/answer/:id',answerController.updateAnswer)
module.exports = router