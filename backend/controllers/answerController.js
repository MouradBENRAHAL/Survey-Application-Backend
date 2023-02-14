const Answer = require('../models/Answers');
const fs = require('fs');
const randomstring = require("randomstring");

//----- Add Survey -----
exports.store = async (req, res) => {
    try {
        await req.body.answers.map(q => {
            let img
            if (q.type) {
                img = q.answer[0]
                // strip off the data: url prefix to get just the base64-encoded bytes
                let data = img.toString().replace(/^data:image\/\w+;base64,/, "");
                let buf = Buffer.from(data, 'base64');
                let random = randomstring.generate(10)
                fs.writeFile('./backend/public/images/' + random + '.jpg', buf, function (err, result) { if (err) console.log('error', err) });
                q.answer = [random + '.jpg']
                delete q.type
            }
        })

        // save survey 
        const setAnswers = new Answer({
            answers: req.body.answers,
            surveyId: req.body.surveyId,
            userId: req.user,
        });
        let show = await setAnswers.save();
        res.send(show);

    } catch (err) {
        console.log(err, "err")
        res.status(400).send(err)
    }
}
