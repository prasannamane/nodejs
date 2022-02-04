//const UserModel = require('../models/UserModel');
//const user = new UserModel();
const Joi = require('joi');

class UserController{

    async subscribe(req){
        console.log(req.body.email);
        return true;
        //user.insert(table, insert_data);

    }

    async inserttest(){
       return 1;
    }

    update(table, update_data, condition){
        
    }
    see(){
        return true;
        
    }

    get(){
        return true;
        
    }

    update(){
        return true;
        
    }

    
}
User = new UserController();
exports.see = async (req, res, next) => {
    res.write('Hello world');
        res.end();
};

function validateInput(req){
    const schema = {
        email: Joi.string().min(5).required()
    }
    return Joi.validate(req.body, schema);
}

exports.subscribe = async (req, res, next) => {
    
    const validate = validateInput(req);
    if(validate.error) return res.status(400).send(validate.error);

    const result = await User.subscribe(req);
    if(result){
        res.status(200).send('Email added to be subscribe successfully.');
    }else{
        res.status(404).send('Something went wrong.');
    }
};




exports.get = async (req, res, next) => {
    
    var result = await User.inserttest();

    if(result){
        res.status(200).send('It is True');
    }else{
        res.status(404).send('It is False');
    }
    

};


exports.put = async (req, res, next) => {
    
    var result = await User.update();

    if(result){
        res.status(200).send('It is True');
    }else{
        res.status(404).send('It is False');
    }
    

};

exports.delete = async (req, res, next) => {
    
    var result = await User.delete();

    if(result){
        res.status(200).send('It is True');
    }else{
        res.status(404).send('It is False');
    }
    

};


