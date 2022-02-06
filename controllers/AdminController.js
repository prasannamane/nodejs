//const UserModel = require('../models/UserModel');
//const user = new UserModel();

class AdminController{

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
    res.render('index', {title: 'Admin', message:'Welcome to admin'});
};
