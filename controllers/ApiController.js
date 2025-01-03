//const UserModel = require('../models/UserModel');
//const user = new UserModel();
///Applications/MAMP/htdocs/nodejs/nodejs/models/Admin/AdminModel.js
const ModelsAdminCommon = require('../models/Admin/AdminModel');
const crypto = require('crypto');


class ApiController {

    constructor() {
        this.ObjModelsAdminCommon = new ModelsAdminCommon();
        this.table;
    }

    async retrieve(mobile, password) {
        const condition = [];
        condition['mobile'] = mobile;
        condition['password'] = password;
        this.table = 'register';
        return this.ObjModelsAdminCommon.retrieve(this.table, condition);
    }

    login() {
        return true;
    }

    async insert(table, insert_data) {
        return this.ObjModelsAdminCommon.insert(table, insert_data);
    }

    update(table, update_data, condition) {

    }

    async list() {
        return this.ObjModelsAdminCommon.list()
    }


}

const ObjApiController = new ApiController();

exports.list = async (req, res, next) => {
    try {
        const list = await ObjApiController.list();

        // Send the data as JSON response
        res.json({
            status: 'success',
            message: 'Data retrieved successfully',
            data: list,

        });
    } catch (error) {
        console.error('Error in see function:', error);
        res.status(500).json({
            status: 'error',
            message: 'An error occurred while processing your request',
            error: error.message
        });
    }
};

exports.register = async (req, res, next) => {
    var insert_data= [];
    insert_data['mobile'] = req.body.mobile;
    insert_data['password'] = req.body.password;
   /* const { mobile, password } = req.body;

    if (!mobile || !password) {
        return res.status(400).json({
            status: 'error',
            message: 'Mobile and Password are required'
        });
    }

    const insert_data = { mobile, password };
*/
    try {
        const result = await ObjApiController.insert('register', insert_data);
        const list = await ObjApiController.list();

        // Send the data as JSON response
        res.json({
            status: 'success',
            message: 'Registration successful',
            insertedId: result.id,
            data: list
        });

    } catch (error) {
        console.error('Error in registration:', error);

        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({
                status: 'error',
                message: 'User with this mobile already exists',
                error: error.message
            });
        }

        res.status(500).json({
            status: 'error',
            message: 'An error occurred while registering',
            error: error.message
        });
    }
};



exports.login = async (req, res, next) => {

    const mobile = req.body.mobile;
    const password = crypto.createHash('sha1').update(req.body.password).digest('hex');
    const retrieve = await ObjApiController.retrieve(mobile, password);
    console.log(retrieve);
    console.log('Checkoing log');

    if (retrieve == undefined || retrieve.length === 0) {
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
