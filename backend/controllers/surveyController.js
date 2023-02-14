const Survey = require('../models/Survey');
const Question = require('../models/Question');

//----- Add Survey -----
exports.store = async (req, res) => {
    try {
        // create the questions
        let surveyQuestions = req.body.surveyQuestions.map(question => {
            return new Question({
                question: question.question,
                typeQuestion: question.typeQuestion,
                choices: question.choices,
            })
        })

        // save the questions in Question|  *insertMany() inserts each element in the array into the collection*
        const questionsSaved = await Question.insertMany(surveyQuestions)

        // get ids questions from questionSaved
        let idQuestions = questionsSaved.map(one => { return one._id })

        // save survey 
        const survey = new Survey({
            userId: req.user,
            surveyName: req.body.surveyName,
            surveyDescription: req.body.surveyDescription,
            surveyQuestions: idQuestions
        });
        let savedSurvey = await survey.save();
        res.send(savedSurvey);
    } catch (err) {
        console.log(err, "error")
        res.status(400).send(err)
    }
}


//----- Find List Surveys of UserConnected (name & description) -----
exports.FindSurvey = async (req, res) => {
    try {
        const listSurvey = await Survey.find({ userId: req.user }).select("_id surveyName surveyDescription");
        res.json(listSurvey);
    } catch (err) {
        res.json({ message: 'empty list' })
    }   
}

//----- Find All Surveys -----
exports.FindAllSurveys = async (req, res) => {
    try {
        const Allsurvey = await Survey.find().select("_id surveyName surveyDescription");
        res.json(Allsurvey);
    } catch (err) {
        res.json({ message: 'empty list' })
    }
}

//----- Get Survey détails -----
exports.SurveyDetails = async (req, res) => {
    try {
        const details = await Survey.findById(req.params.id)
            .populate('surveyQuestions')
            .select(" -createdAt -updatedAt")
        res.json(details);
    } catch (err) {
        res.json({ message: 'empty list' })
    }
}

//----- Edit Survey -----
exports.UpdateSurvey = async (req, res) => {
    try {
        //get the target survey 
        let target = await Survey.findById(req.params.id);
        //delete questions in Question
        await Question.deleteMany({ _id: { $in: target.surveyQuestions } })
        // create the new questions
        let surveyQuestions = req.body.surveyQuestions.map(question => {
            return new Question({
                question: question.question,
                typeQuestion: question.typeQuestion,
                choices: question.choices,
            })
        })
        // save the questions in Question
        const questionsSaved = await Question.insertMany(surveyQuestions)

        // get the new ids questions from questionSaved
        let idQuestions = questionsSaved.map(one => { return one._id })

        // update survey 
        const survey = {
            surveyName: req.body.surveyName,
            surveyDescription: req.body.surveyDescription,
            surveyQuestions: idQuestions,
            userId : req.user
        };
        // save survey in Survey  
        let updatedSurvey = await Survey.findByIdAndUpdate(req.params.id, { $set: survey });
        res.send(updatedSurvey);
    } catch (err) {
        res.status(400).send(err)
    }
}

//-----Delete user----
exports.destroy = async (req, res) => {
    try {
        //get the target survey 
        let target = await Survey.findById(req.params.id);
        //delete questions in Question
        await Question.deleteMany({ _id: { $in: target.surveyQuestions } })
        //delete survey
        await Survey.findByIdAndDelete(req.params.id);
        res.json({ message: 'survey deleted successfully' })
    } catch (err) {
        res.json({ message: 'An error occured' })
    }
}