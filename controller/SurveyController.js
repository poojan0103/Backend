const surveyschema = require("../model/SurveySchema");
const answerSchema = require("../model/AnswerSchema");
const { error } = require("../util/Message");
exports.addSurvey = (req, res) => {
  const survey =  surveyschema({
    name: req.body.name,
    points: req.body.points,
   // question_id: req.body.question_id,
  //  user:req.body.user
  });
  survey
    .save()
    .then((data) => {
      res.json(data);
     
    })
    .catch((err) => {
      res.json(err);
    });
};

exports.getSurvey = async (req, res) => {
  try {
    const result = await surveyschema.find();
    res.status(200).json({
      message: "survey List",
      result: result,
    });
  } catch (err) {
    res.send(err);
  }
  
};

exports.getSurveybyid = async (req, res) => {
  try {
    const result = await surveyschema
      .findById(req.params.id)
      .populate("question_id");
    res.status(200).json({
      message: "survey List",
      result: result,
    });
  } catch (err) {
    res.send(err);
  }
};

exports.updateSurvey = async (req, res) => {
  try {
    const result = await surveyschema.findByIdAndUpdate(
      req.params.id,
      req.body,
      {new: true}
    );
    res.status(200).json({
      message: "survey List",
      result: result,
    });
  } catch (err) {
    res.send(err);
  }
};

exports.checkSurvey = async(req,res,next) =>{
  try{ 
    const user = req.params.user;
    const survey = req.params.survey;
    const result = await answerSchema.find({user:user,survey:survey})
      if(result.length>0){
        res.status(200).json({
          message: "survey already taken",
          
        });
      }
      else{
        res.status(200).json({
        message: "survey not taken "
      
      })
      }
    }
  
  catch(err){
    res.send
    (err);
  }
}
