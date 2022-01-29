const express = require('express');
const User = require('../controllers/UserController');
const Admin = require('../controllers/AdminController');

const router = express.Router();

//router.post('/insert', UserController.insert);

router
    .route('/user')
    .get(User.see);

    router
    .route('/user/subscribe')
    .get(User.see);

router
    .route('/admin')
    .get(Admin.see);




module.exports = router