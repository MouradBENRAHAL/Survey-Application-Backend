const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const answersSchema = new Schema(
    {
        answers: [{
            answer: [],
            question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' }
        }],
        //ID USER 
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        //ID SUVERY
        surveyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Survey' }
    },
    { timestamps: true }, { versionKey: false }
);

module.exports = mongoose.model('Answers', answersSchema);
