const answerController = require('../controller/AnswerController')
const express = require('express')
const router = express.Router()

router.post('/answer',answerController.addAnswers)
router.get('/answer',answerController.getAnswers)
router.put('/answer/:id',answerController.updateAnswer)
module.exports = router