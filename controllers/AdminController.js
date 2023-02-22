//const UserModel = require('../models/UserModel');
//const user = new UserModel();
const ModelsAdminCommon = require('../Models/Admin/Common');
const crypto = require('crypto');


class AdminController {

    constructor() {
        this.ObjModelsAdminCommon = new ModelsAdminCommon();
        this.table;
    }

    async retrieve(mobile, password)
    {
        const condition = [];
        condition['mobile'] = mobile;
        condition['password'] = password;
        this.table = 'register';
        return this.ObjModelsAdminCommon.retrieve(this.table, condition);
    }

    login() {
        return true;
    }

    insert(table, insert_data) {
        return true;
        //user.insert(table, insert_data);

    }

    update(table, update_data, condition) {

    }

    async see() {
        const ObjAdminModel = await new AdminModel();
        return ObjAdminModel.see()

    }


}

const ObjAdminController = new AdminController();

exports.see = async (req, res, next) => {
    mydata = await ObjAdminController.see();
    console.log(mydata);
    res.render('admin/index', { title: 'Admin', message: 'Welcome to admin', data: mydata });
};

exports.login = async (req, res, next) => {
    
    const mobile = req.body.mobile;
    const password = crypto.createHash('sha1').update(req.body.password).digest('hex');
    const retrieve = await ObjAdminController.retrieve(mobile, password);
    console.log(retrieve);
    console.log('Checkoing log');

    if (retrieve == undefined || retrieve.length === 0 ) {
        req.flash('info', 'Invalid username or password.');
        res.redirect('/admin');
      } else {
        req.session.name = retrieve[0].name;
        req.session.id = retrieve[0].id;
        req.flash('info', 'You are now logged in.');
        res.redirect('/admin/dashboard');
      }
    
};

exports.dashboard = async (req, res, next) => {
    const message = req.flash('info')[0];
    console.log(message);
    res.render('admin/dashboard', { message: message });

};
