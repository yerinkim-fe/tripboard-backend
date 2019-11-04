const express = require('express');
const router = express.Router();
const tripsController = require('./controllers/trips.controller');

router.post('/photos/upload', tripsController.uploadFile);

module.exports = router;
