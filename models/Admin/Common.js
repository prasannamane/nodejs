//const UserModel = require('../models/UserModel');
//const user = new UserModel();

const Database = require('../Database');
const sql = require('sql-query');
const sqlQuery = sql.Query(); //for dialect: sql.Query('postgresql')

class Common {

    constructor() {
        console.log('Calling db');
        this.ObjDatabase = new Database();
        this.sqlSelect;
        this.query;
    }

    async retrieve(table, condition) {
        this.sqlSelect = sqlQuery.select();
        try {
            this.query = this.sqlSelect.from(table).where(condition).build();
            return await this.ObjDatabase.query(this.query);
        } catch (error) {
            console.error("Second Error " + error);
        }
    }

    async insert(table, data) {
        this.sqlSelect = sqlQuery.insert();
        try {
            console.log(data);
            this.query = this.sqlSelect.into(table).set(data).build();
            return await this.ObjDatabase.query(this.query);
        } catch (error) {
            console.error("Second Error " + error);
        }
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


module.exports = Common;