const express = require('express');
const UserController = require('../controllers/UserController');

const router = express.Router();

//router.post('/insert', UserController.insert);

router
    .route('/')
    .get(UserController.see);


module.exports = router