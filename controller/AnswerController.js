const questionschema = require("../model/AnswerSchema");

exports.addanswers = (req, res) => {
  const newanswers = new questionschema({
    answer: req.body.answer,
    user: req.body.user,
  });
  newanswers
    .save()
    .then((answers) => {
      res.json(answers);
      console.log(answers);
    })
    .catch((err) => {
      res.send("error" + err);
      console.log(err);
    });
};
exports.getanswers = (req, res) => {
  questionschema
    .find()
    .populate("user")
    .then((answers) => {
      res.json(answers);
    })
    .catch((err) => {
      res.send("error" + err);
      console.log(err);
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
exports.getanswer = (req, res) => {
  const answerid = req.params._id;
  questionschema
    .find({ _id: answerid })
    .populate("user")
    .then((answers) => {
      res.json(answers);
    })
    .catch((err) => {
      res.send("error" + err);
      console.log(err);
    });
};
