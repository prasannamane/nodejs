const express = require('express');
const AdminController = require('../Controllers/AdminController');
const router = express.Router();


router.get('/', (req, res) => { 
    const message = req.flash('info')[0];
    console.log(message);
    res.render('admin/login', {title: 'App', message:message});
});

/*
router.get('/', (req, res) => { 
    const message = req.flash('info')[0];
    console.log(message);
    res.render('admin/dashboard', { message: message });
    
    res.render('admin/login', {title: 'App', message:'Welcome'});
});
*/

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