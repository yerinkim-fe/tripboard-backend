const express = require('express');
const router = express.Router();

const usersController = require('./controllers/users.controller');
const tripsController = require('./controllers/trips.controller');

const { signUpValidator } = require('./middlewares/signUpValidator');
const { signInValidator } = require('./middlewares/signInValidator');
const { verifyToken } = require('./middlewares/authorization');

router.post('/', signUpValidator, usersController.createUser);
router.post('/getToken', signInValidator, usersController.getToken);
// router.get('/getUser', verifyToken, usersController.getUser);

router.post('/:user_id/trips/new', verifyToken, tripsController.createTrip);
router.get('/:user_id/trips', verifyToken, tripsController.getTrip);


module.exports = router;
