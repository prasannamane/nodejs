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

    async get_all(common) {
        return common.find();
    }

    async subscribe_get(common) {
        var mysort = { email: 1 };
        
        return common.find().sort(mysort).limit(1);
    }

    async get_id(req, common) { 
        return common.find({ _id: req.params.id });
    }
    
    async update(req, common){
        return common.update({ _id: req.params.id },
            {
                $set: {
                    email: req.body.email
                }
            });
    }
    
}
User = new UserController();

exports.subscribe = async (req, res, next) => {
    const validate = validateInput(req);
    if (validate.error) return res.status(400).send(validate.error);
    const subscribe = await User.subscribe(req, common.connection);
    const result = await subscribe.save();
    const get = await User.subscribe_get(common.connection);
    if (result) {
        res.status(200).send(result);
    } else {
        res.status(404).send('Something went wrong.');
    }
};

exports.get_all = async (req, res, next) => {

    const subscribe = await User.subscribe(req, common.connection);
    const get_all = await User.get_all(common.connection);

    if (get_all) {
        res.status(200).send(get_all);
    } else {
        res.status(404).send('Something went wrong.');
    }
};

exports.get_id = async (req, res, next) => {
    const subscribe = await User.subscribe(req, common.connection);
    const get_id = await User.get_id(req, common.connection);

    if (get_id) {
        res.status(200).send(get_id);
    } else {
        res.status(404).send('Something went wrong.');
    }
};


exports.update = async (req, res, next) => {
    const subscribe = await User.subscribe(req, common.connection);
    const update = await User.update(req, common.connection);
    if (update) {
        res.status(200).send(update);
    } else {
        res.status(404).send('Something went wrong.');
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