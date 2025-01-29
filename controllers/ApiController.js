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

    login(table, fetch_data) {
        return this.ObjModelsAdminCommon.login(table, fetch_data);
    }

    async insert(table, insert_data) {
        return this.ObjModelsAdminCommon.insert(table, insert_data);
    }

    update(table, update_data, condition) {

    }

    async list() {
        return this.ObjModelsAdminCommon.list()
    }

    async generateRandomString(length) {
        const bytes = crypto.randomBytes(Math.ceil(length / 2));
        let randomstring = bytes.toString('base64');
        randomstring = randomstring.replace(/[^A-Za-z0-9]/g, '');
        randomstring = randomstring.slice(0, length).padEnd(length, '0');
        return randomstring;
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
            userlist: list,

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
    var insert_data = [];
    insert_data['mobile'] = req.body.mobile;
    insert_data['password'] = req.body.password;
    insert_data['email'] = req.body.email;
    insert_data['username'] = req.body.username;
    insert_data['first_name'] = req.body.first_name;
    insert_data['last_name'] = req.body.last_name;
    insert_data['python_id'] = req.body.python_id;
    try {
        const result = await ObjApiController.insert('register', insert_data);
        const list = await ObjApiController.list();

        // Send the data as JSON response
        res.json({
            status: 'success',
            message: 'Registration successful',
            error: 0,
            insertedId: result.insertId,
            data: list
        });

    } catch (error) {
        console.error('Error in registration:', error);
        console.log("error", error)

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

exports.signin = async (req, res, next) => {
    var insert_data = [];
    var fetch_data = [];
    fetch_data['mobile'] = req.body.mobile;
    fetch_data['password'] = req.body.password;
    try {
        const result = await ObjApiController.login('register', fetch_data);
        insert_data['register_id'] = result[0]?.id ?? null;
        insert_data['token'] = await ObjApiController.generateRandomString(16);
        await ObjApiController.insert('login', insert_data);
        res.json({
            status: 'success',
            message: 'Sign in successful',
            login_token: insert_data['token'],
            user: result
        });
    } catch (error) {
        console.error('Error in signin:', error);
        console.log("error", error)
        return res.status(409).json({
            status: 'error',
            message: 'User with this mobile not exists',
            error: error.message
        });


    }
}


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
