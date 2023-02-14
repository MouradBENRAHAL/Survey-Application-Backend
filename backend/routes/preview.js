module.exports = app => {
    const previewController = require('../controllers/previewController')
    app.get('/viewStat/:id', previewController.Find);

}