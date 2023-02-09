const express = require('express');
const app = express();
const AdminController = require('../controllers/AdminController');
const router = express.Router();
//const ObjAdminController = new AdminController();

router.get('/', (req, res) => { 
    res.render('admin/login', {title: 'App', message:'Welcome'});
});
console.log('Loading route');
//router.route('/see').get(AdminController.see);
router.route('/see').get(AdminController.see);

module.exports = router