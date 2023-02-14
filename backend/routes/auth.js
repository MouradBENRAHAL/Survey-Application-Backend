module.exports = app => {
    const userController = require('../controllers/userController')
    app.post('/register', userController.store);
    app.put('/updateUser/:id', userController.update);
    app.delete('/deleteUser/:id', userController.destroy);
    app.get('/listUsers/:id', userController.listUsers);
    app.post('/login', userController.login);
}