const questionschema = require("../model/AnswerSchema");

exports.addAnswers = (req, res) => {
  const newanswers = new questionschema({
    answer: req.body.answer,
    user: req.body.user,
    survey:req.body.survey
  });
  newanswers
    .save()
    .then((answers) => {
      res.json(answers);
    
    })
    .catch((err) => {
      res.send("error" + err);
      
    });
};
exports.getAnswers = (req, res) => {
  questionschema
    .find()
    .populate("user").populate("survey")
    .then((answers) => {
      res.json(answers);
    })
    .catch((err) => {
      res.send("error" + err);
     
    });
};
exports.updateAnswer = (req, res) => {
  questionschema
    .findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          answer: req.body.answer,
        },
      },
      { new: true }
    )
    .then((answer) => {
      res.json(answer);
    })
    .catch((err) => {
      res.status(500).send("Error occurred while updating answer: " + err);
    });
};
