const express = require('express');
const router = express.Router();
const usersController = require('./controllers/users.controller');
const { signUpValidator } = require('./middlewares/signUpValidator');
const { signInValidator } = require('./middlewares/signInValidator');
const { verifyToken } = require('./middlewares/authorization');

router.post('/', signUpValidator, usersController.create);
router.post('/getToken', signInValidator, usersController.getToken);
router.get('/getUser', verifyToken, usersController.getUser);

module.exports = router;
