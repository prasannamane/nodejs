//const UserModel = require('../models/UserModel');
//const user = new UserModel();

const Database = require('../Database');
const sql = require('sql-query');
const sqlQuery = sql.Query(); //for dialect: sql.Query('postgresql')

class AdminModel {

    constructor() {
        this.ObjDatabase = new Database();
        this.sqlSelect = sqlQuery.select();
        this.query;
    }

    async retrieve(table, condition) {
        try {
            if (!table || typeof table !== 'string') {
                throw new Error('Invalid table name provided.');
            }
            if (!condition || typeof condition !== 'object') {
                throw new Error('Invalid condition provided. Expected an object.');
            }

            this.query = this.sqlSelect.from(table).where(condition).build();
            console.log('Executing query:', this.query);

            const result = await this.ObjDatabase.query(this.query);
            return result;
        } catch (error) {
            console.error('Error in retrieve method:', error.message);
            console.error('Stack Trace:', error.stack);
            throw new Error(`Failed to retrieve data from table ${table}: ${error.message}`);
        }

    }

    insert(table, insert_data) {
        run();
        return true;
        //user.insert(table, insert_data);

    }

    update(table, update_data, condition) {

    }

    async see() {
        console.log('Loading model');
        try {
            const ObjDatabase = await new Database();

            return await ObjDatabase.query('SELECT * FROM `category`');
            /*.then((result) => {
                
                //console.log(result);
                //return result;
              })
            .then((result) => {
                //resolve(rows);
                //return result;
                //console.log('Result: ', result);
                //console.log('Connected to the category table');
                
              })
              .catch(err => {
                //console.error("First Error " + err);
              });*/

            //console.log("Rows "+rows);
        } catch (error) {
            console.error("Second Error " + error);
        }
    }
}


module.exports = AdminModel;