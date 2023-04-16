const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SurveyUserSchema = new Schema ({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Signup'
    },
    survey:{
        type:Schema.Types.ObjectId,
        ref:'Survey'
    },

})
module.exports = mongoose.model('Suerveyuser',SurveyUserSchema)