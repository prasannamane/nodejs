const express = require('express');
const AdminController = require('../controllers/AdminController');
const router = express.Router();

router.get('/', (req, res) => { 
    res.render('admin/login', {title: 'App', message:'Welcome'});
});
console.log('1. Route');

router.route('/see').get(AdminController.see);

router.route('/login').post(AdminController.login);


module.exports = router