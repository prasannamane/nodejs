//const UserModel = require('../models/UserModel');
//const user = new UserModel();

class UserController{

    insert(table, insert_data){
        return true;
        //user.insert(table, insert_data);

    }

    update(table, update_data, condition){
        
    }
    see(){
        return true;
        
    }
}

exports.see = async (req, res, next) => {
    res.write('Hello world');
        res.end();
};
