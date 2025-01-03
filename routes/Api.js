const express = require('express');
const ApiControllers = require('../controllers/ApiController');
const routerApi = express.Router();


routerApi.route('/').get(ApiControllers.list);
routerApi.route('/register').post(ApiControllers.register);
module.exports = routerApi;