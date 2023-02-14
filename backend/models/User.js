const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "can't be blank"],
            match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
            min: 3,
            max: 255
        },
        email: {
            type: String,
            lowercase: true,
            required: [true, "can't be blank"],
            unique: true,
            min: 3,
            max: 255
        },
        gender: {
            type: String,
            required: [true, "can't be blank"],
        },
        password: {
            type: String,
            required: [true, "can't be blank"]
        },
    },{ timestamps: true }
);

module.exports = mongoose.model('User', userSchema);