const mongoose = require('mongoose');
const Schema = mongoose.Schema

const AnswerSchema = new Schema({
    answer: {
        type: Object,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Signup'
    },
    
    createdAt: {
        type: Date,
        default: Date.now()
    }
})
module.exports = mongoose.model('Answer',AnswerSchema)
    
    