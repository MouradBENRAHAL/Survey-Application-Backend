const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const surveySchema = new Schema(
    {
        surveyName: {
            type: String
        },
        surveyDescription: {
            type: String
        },
        //Survey 
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        //Survey has many questions
        surveyQuestions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }]
    },
    { timestamps: true }, { versionKey: false }
);

module.exports = mongoose.model('Survey', surveySchema);
