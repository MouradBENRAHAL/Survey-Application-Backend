const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//-----list Users-----
exports.listUsers = async (req, res) => {
    try {
        const list = await User.find();
        res.json({ list })
    } catch (err) {
        res.json({ message: 'empty list' })
    }
}

//-----add User-----
exports.store = async (req, res) => {
    //Hash passwords
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    //Create a new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        password: hashedPassword
    });
    try {
        await user.save();
        res.send({ message: 'successfuly ' });
    } catch (err) {
        res.status(400).send(err)
    }
}

//-----Login user-----
exports.login = async (req, res) => {
    //checking if the email exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(200).send({ auth: false, accessToken: null, message: 'Email not found' });
    //Password is correct  
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(200).send({ auth: false, accessToken: null, message: 'password is wrong' });
    //Create token
    let token = jwt.sign(
        { _id: user._id },
        process.env.TOKEN_SECRET,
        {
            expiresIn: "4h"
        })
    res.status(200).send({ accessToken: token, auth: true });
}

//-----Update user-----
exports.update = async (req, res) => {
    //update user
    let updateData = {
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
    }
    if (req.body.password) {
        updateData.password = await bcrypt.hash(req.body.password, 10);
    }

    try {
        await User.findByIdAndUpdate(req.params.id, { $set: updateData });
        res.json({ message: 'User updated Successfully' })
    }
    catch (err) {
        res.json({ message: 'An error occured' })
    }
}

//-----Delete user----
exports.destroy = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'User deleted Successfully' })
    } catch (err) {
        res.json({ message: 'An error occured' })
    }
}

