//const UserModel = require('../models/UserModel');
//const user = new UserModel();

const Database = require('../Database');
const sql = require('sql-query');
const sqlQuery = sql.Query(); //for dialect: sql.Query('postgresql')

class Common {

    constructor() {
        this.ObjDatabase = new Database();
        this.sqlSelect = sqlQuery.select();
        this.query;
    }

    async retrieve(table, condition){
        try {
            this.query = this.sqlSelect.from(table).where(condition).build();
            return await this.ObjDatabase.query(this.query);
        } catch (error) {
            console.error("Second Error " + error);
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
            
            return await  ObjDatabase.query('SELECT * FROM `category`');
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