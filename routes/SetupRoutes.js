const express = require('express');
const app = express();
const Setup = require('../controllers/SetupController');
const router = express.Router();

router.route('/').get(Setup.connection);
module.exports = router