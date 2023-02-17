const express = require('express');
const AdminController = require('../Controllers/AdminController');
const router = express.Router();

router.get('/', (req, res) => { 
    res.render('admin/login', {title: 'App', message:'Welcome'});
});
console.log('1. Route');

router.route('/see').get(AdminController.see);

router.route('/login').post(AdminController.login);

router.route('/dashboard').get(AdminController.dashboard);
/*
app.get('/dashboard', (req, res) => {
    const message = req.flash('info')[0];
    res.render('dashboard', { message: message });
  });
  */
module.exports = router;