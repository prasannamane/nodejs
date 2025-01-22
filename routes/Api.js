const express = require('express');
const ApiControllers = require('../controllers/ApiController');
const routerApi = express.Router();


routerApi.route('/').get(ApiControllers.list);
routerApi.route('/register').post(ApiControllers.register);
routerApi.route('/signin').post(ApiControllers.signin);
module.exports = routerApi;