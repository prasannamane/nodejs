//const UserModel = require('../models/UserModel');
//const user = new UserModel();
const Joi = require('joi');
const mongoose = require('mongoose');

class SetupController {

    connection() {
        mongoose.connect('mongodb://127.0.0.1:27017/subscriber')
            .then(() => console.log('Connected to MongoDB...'))
            .catch(err => console.error('Could not connect to MongoDB...', err));
            return true;
    }
    creteModel() {
        const subscribeSchema = new mongoose.Schema({
            name: String
        });
        return mongoose.model('Subscribe', subscribeSchema);
    }
    creteSubscribe(Subscribe) {
        return new Subscribe({
            name: 'Subscribe Chennel Now',
            email: 'prasannamane7@gmail.com',
            author: 'Prasanna',
            tags: ['node', 'backend'], 
            isPublished: true
        });
    }
    subscribe(Subscribe) {
        return Subscribe.find();
    }
}

Setup = new SetupController();
exports.connection = async (req, res, next) => {

    const connection = await Setup.connection();
    const Subscribe = await Setup.creteModel();
    const creteSubscribe = await Setup.creteSubscribe(Subscribe);
    const save = await creteSubscribe.save();
    const getSubscribe = await Setup.subscribe(Subscribe);
    res.status(200).send(getSubscribe);
};