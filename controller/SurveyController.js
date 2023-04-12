const surveyschema = require("../model/SurveySchema");

exports.addSurvey = (req, res) => {
  const survey = new surveyschema({
    name: req.body.name,
    points: req.body.points,
    question_id: req.body.question_id,
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
