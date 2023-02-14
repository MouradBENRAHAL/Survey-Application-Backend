const express = require("express")
const Dotenv = require('dotenv');
const mongoose = require("mongoose")
const cors = require('cors')
//Create a database named "Survey":
Dotenv.config();
const app = express()

//Middleware
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extend: true }));
app.use(express.static(`./backend/public/images`));
require('./backend/routes/auth.js')(app);
require('./backend/routes/survey.js')(app);
require('./backend/routes/answer.js')(app);
require('./backend/routes/preview.js')(app);
const uri = "mongodb://mouraf:mourad123@cluster0.dhihn.mongodb.net/surveyDB?retryWrites=true&w=majority";

mongoose
    .connect(process.env.MONGODB_URI || uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
    .then(() => {
        console.log('Successfully connected to the database');
    })
    .catch(err => {
        console.log('Could not connect to the database. Exiting now...', err);
        process.exit();
    });

app.get('/', (req, res) => {
    res.send("Back deployed")

});
const PORT = 5000
app.listen(process.env.PORT || PORT, () => {
    console.log(`app is listening to PORT ${PORT}`)
})