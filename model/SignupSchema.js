const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const SignupSchema =  Schema({

    name: {
        type: String
        
    },
    
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    gender : {
        type: String,
        required: true
    },
    phone : {
        type: Number,
        required: true
    },
    is_verified :{
        type: Number,
        default:0
    },
    points:{
        type: Number,
        default:0
    },
    totalsurvey:{
        type: Number,
        default:0
    },
  
 
})

module.exports = mongoose.model('Signup', SignupSchema)
