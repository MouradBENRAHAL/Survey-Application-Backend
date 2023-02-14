module.exports = app => {
    const answerController = require('../controllers/answerController')
    const verifyToken = require('../middleware/authentification');
    app.post('/answer', verifyToken, answerController.store);
}