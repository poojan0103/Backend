const { result } = require("lodash");
const questionschema = require("../model/questionSchema");

exports.addQuestion = (req, res) => {
  const question = new questionschema({
    id: req.body.id,
    text: req.body.text,
    type: req.body.type,

    survey: req.body.survey,
  });
  question
    .save()
    .then((data) => {
      res.json(data);
   
    })
    .catch((err) => {
      res.json(err);
      
    });
};

exports.getQuestion = (req, res) => {
  
  const surveyid = req.params.survey;
 
  
  questionschema
    .find({ survey: surveyid })
    .populate("survey")
    .then((result) => {
      res.json({
        message: "List",
        result: result,
      });
    })
    .catch((err) => {
      res.json(err);
    });
};
