const express = require('express');
const User = require('../controllers/UserController');
const Admin = require('../controllers/AdminController');

const router = express.Router();

//router.post('/insert', UserController.insert);

router.route('/user').get(User.see);
router.route('/user/subscribe').post(User.subscribe); 
router.route('/user/subscribe/:id').get(User.get);  
router.route('/user/subscribe/:id').put(User.put); 
router.route('/user/subscribe/:id').delete(User.delete);  
router.route('/admin').get(Admin.see);
module.exports = router