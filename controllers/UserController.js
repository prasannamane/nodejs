const common = require('../models/CommonModel');
//console.log(common.connection);
//const common = new CommonModel();
//const UserModel = require('../models/UserModel');
//const user = new UserModel();
const Joi = require('joi');

class UserController {

    async subscribe(req, common) {
            return new common({
                name: 'Subscribe Chennel Now',
                email: req.body.email,
                author: 'Prasanna',
                tags: ['node', 'backend'], 
                isPublished: true
            });
       
    }

    async inserttest() {
        return 1;
    }

    update(table, update_data, condition) {
        return true;
    }
    
    see() {
        return true;
    }

    get() {
        return true;
    }

    update() {
        return true;
    }
}
User = new UserController();

exports.subscribe = async (req, res, next) => {
    const validate = validateInput(req);
    if (validate.error) return res.status(400).send(validate.error);

    const subscribe = await User.subscribe(req, common.connection);
    const result = await subscribe.save();
    if (result) {
        res.status(200).send('Email added to be subscribe successfully.');
    } else {
        res.status(404).send('Something went wrong.');
    }
};

exports.get = async (req, res, next) => {
    var result = await User.inserttest();
    if (result) {
        res.status(200).send('It is True');
    } else {
        res.status(404).send('It is False');
    }
};

exports.put = async (req, res, next) => {
    var result = await User.update();
    if (result) {
        res.status(200).send('It is True');
    } else {
        res.status(404).send('It is False');
    }
};

exports.delete = async (req, res, next) => {
    var result = await User.delete();
    if (result) {
        res.status(200).send('It is True');
    } else {
        res.status(404).send('It is False');
    }
};

exports.see = async (req, res, next) => {
    res.write('Hello world');
    res.end();
};

function validateInput(req) {
    const schema = {
        email: Joi.string().min(5).required()
    }
    /* npm install joi@13.1.0
    */
    return Joi.validate(req.body, schema);
}