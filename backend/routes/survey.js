module.exports = app => {
    const surveyController = require('../controllers/surveyController')
    const verifyToken = require('../middleware/authentification');
    app.post('/survey', verifyToken, surveyController.store);
    app.get('/listSurveys', verifyToken, surveyController.FindSurvey);
    app.get('/allSurveys', surveyController.FindAllSurveys);
    app.get('/detailSurvey/:id', surveyController.SurveyDetails);
    app.put('/updateSurvey/:id', verifyToken, surveyController.UpdateSurvey);
    app.delete('/deletesurvey/:id', surveyController.destroy);
}