const express = require('express');
const app = express();
const User = require('../controllers/UserController');
const router = express.Router();

router.route('/').post(User.see);
router.route('/subscribe').post(User.subscribe); 
router.route('/subscribe/:id').post(User.get);  
router.route('/subscribe/:id').put(User.put); 
router.route('/subscribe/:id').delete(User.delete);  

module.exports = router