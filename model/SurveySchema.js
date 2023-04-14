const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const surveySchema =  Schema({
    name :{
        type: String,
        required: true
    },
    points:{
        type: Number,
        required: true
    },
    
})
  
module.exports = mongoose.model('Survey', surveySchema)