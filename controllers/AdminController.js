//const UserModel = require('../models/UserModel');
//const user = new UserModel();
const AdminModel = require('../models/AdminModel');


class AdminController{

    insert(table, insert_data){
        return true;
        //user.insert(table, insert_data);

    }

    update(table, update_data, condition){
        
    }

    async see(){
        const ObjAdminModel = await new AdminModel();
        return ObjAdminModel.see()
       
    }
}

const ObjAdminController = new AdminController();

exports.see = async (req, res, next) => {
    mydata = await ObjAdminController.see();
    console.log(mydata);
    res.render('admin/index', {title: 'Admin', message:'Welcome to admin', data:mydata});
};