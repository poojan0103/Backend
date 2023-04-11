const { result } = require("lodash");
const questionschema = require("../model/questionSchema");

exports.addquestion = (req, res) => {
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
      console.log(data);
    })
    .catch((err) => {
      res.json(err);
      console.log(err);
    });
};

exports.getquestion = (req, res) => {
  // const surveyid =  mongoose.Types.ObjectId (req.params.survey)
  //const surveyid = req.params.survey
  //convert surveyid into objectid
  const surveyid = req.params.survey;
  console.log(surveyid);
  console.log(typeof surveyid);

  console.log(typeof surveyid);
  //genrate a routes for thisd code

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
