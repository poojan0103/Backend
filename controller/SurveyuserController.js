const SurveyUserschema = require("../model/SurveyUserSchema")

exports.add = (req,res)=>{
    const add = SurveyUserschema({
        user:req.body.user,
        survey:req.body.survey
    });
    add.save()
    .then(data=>{
        res.send(data)
        console.log(data)
    })
    .catch(err=>{
        res.send(err)
        console.log(err)
    })
}
exports.getbyid = (req,res)=>{
    const user = req.params.user;
    try{
    const result = SurveyUserschema.find({user:user}).populate("user").populate("survey")
    res.status(200).json({
        message: "survey List",
        result: result,
      });
    }
    catch(err) {
        res.send(err)
        console.log(err)
    }
}

exports.getAll = (req,res)=>{
    SurveyUserschema.find().populate("user").populate("survey")
    .then(data=>{
        res.send(data)
        console.log(data)
    })
    .catch
    (err=>{
        res.send(err)
        console.log(err)
    })
}