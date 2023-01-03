const express = require('express');
const app = express();
const Admin = require('../controllers/AdminController');
const router = express.Router();

//router.get('/', (req, res) => { 
//    res.render('index', {title: 'App', message:'Welcome'});
//});

router.route('/').get(Admin.see);
module.exports = router