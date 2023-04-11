const mongoose = require('mongoose')
const Schema = mongoose.Schema

const questionSchema = new Schema({
    id:{
        type:Number,
        required:true
    },
    text:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    survey:{
        type:Schema.Types.ObjectId,
        ref:'Survey'
    }
})

    



module.exports = mongoose.model('Question', questionSchema)