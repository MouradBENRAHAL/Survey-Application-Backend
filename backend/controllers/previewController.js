const Answers = require('../models/Answers');
const Survey = require('../models/Survey')
const Question = require('../models/Question');

//----- get survey-----
exports.Find = async (req, res) => {
    try {
        //get survey by id passed in parameter
        const details = await Survey.findById(req.params.id)
            .populate('surveyQuestions')
            .select(" -createdAt -updatedAt -userId")

        let element = details.surveyQuestions.map((e, i) => {
            choices = e.choices
            question = e.question
            nq = i
            typeQuestion = e.typeQuestion
            return (object = {
                choices,
                question,
                nq,
                typeQuestion
            })
        })

        //get all users Answers
        let AllAnswers = await Answers.find({ surveyId: req.params.id }).select('answers').populate("answers.question", "typeQuestion")

        //preparing the model
        for (let index = 0; index < element.length; index++) {
            let newChoices = {}
            if ((element[index].typeQuestion === 'multipleChoice') || (element[index].typeQuestion === 'uniqueChoice')) {
                const choices = element[index].choices
                for (c of choices) {
                    newChoices[c] = 0
                }
                element[index].choices = newChoices
            }
            else {
                element[index].choices = []
            }
        }

        //handle all answers for each user 
        await AllAnswers.map((a) => {
            //fullAnswers contains all the [answers]
            let fullAnswers = a.answers
            for (let j = 0; j < fullAnswers.length; j++) {
                //contains answer[] for each question
                let userAnswers = fullAnswers[j].answer;
                let typeQuestion = fullAnswers[j].question.typeQuestion;
                for (ans of userAnswers) {
                    if ((typeQuestion === 'multipleChoice') || (typeQuestion === 'uniqueChoice')) {
                        element[j].choices[ans]++;
                    }
                    else {
                        element[j].choices.push(String(ans))
                    }
                }
            }
            return (element)
        })

        //handle surveyName & surveyDescription  
        let SurveyDetails = { surveyName: details.surveyName, surveyDescription: details.surveyDescription }
        //object contains stats and surveyDetails
        let arrayOfStats = {}
        arrayOfStats.stats = element
        arrayOfStats.details = SurveyDetails
        res.json(arrayOfStats);

    } catch (err) {
        console.log(err)
        res.json({ message: 'empty list', err })
    }
}

