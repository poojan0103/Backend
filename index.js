const express = require('express');
const app = express();

const bodyParser = require('body-parser')
const mongoose = require('mongoose');
var cors = require('cors')
const signuproutes = require('./routes/SignupRoutes')
const surveyroutes = require('./routes/SurveyRoues')
const questionroutes = require('./routes/QuestionRoutes')
const answerroutes = require('./routes/AnswerRoutes')
const surveyuserroutes = require('./routes/SurveyUserroutes')

const PORT = 3000
app.use(cors())

app.use(express.json())
app.use(answerroutes)
app.use(signuproutes)
app.use(surveyroutes)
app.use(surveyuserroutes)
app.use(questionroutes)
app.use(bodyParser.urlencoded({
  extended: true
}))
app.listen(PORT,()=>{
    console.log("Server is running on port",PORT);
})

mongoose.connect('mongodb://127.0.0.1:27017/user', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to database'))
.catch(err => console.error('Error connecting to MongoDB', err));

