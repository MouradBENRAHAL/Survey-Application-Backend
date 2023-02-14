const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const type_question = Object.freeze({
    uniqueChoice: 'uniqueChoice',
    multipleChoice: 'multipleChoice',
    text: 'text',
    number: 'number',
    image: 'image'
});
const questionSchema = new Schema(
    {
        question: {
            type: String
        },
        typeQuestion: {
            type: String,
            enum: Object.values(type_question)
        },
        choices: [{
            type: String
        }],
    }, { versionKey: false });
module.exports = mongoose.model('Question', questionSchema);
