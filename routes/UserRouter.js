const express = require('express');
const app = express();
const User = require('../controllers/UserController');
const router = express.Router();

router.route('/').post(User.see);
router.route('/subscribe').post(User.subscribe); 
router.route('/subscribe/get/all').post(User.get_all); 
router.route('/subscribe/get/:id').get(User.get_id);  
router.route('/subscribe/update/:id').put(User.update); 
router.route('/subscribe/delete/:id').delete(User.delete);  

module.exports = router 