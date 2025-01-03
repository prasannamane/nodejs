//const UserModel = require('../models/UserModel');
//const user = new UserModel();

//const Database = require('../Database');
const sql = require('sql-query');
const Database = require('../Database');
const sqlQuery = sql.Query(); //for dialect: sql.Query('postgresql')

class AdminModel {

    constructor() {
        this.ObjDatabase = new Database();
        this.sqlSelect = sqlQuery.select();
        this.sqlInsert = sqlQuery.insert();
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
            return await this.ObjDatabase.query(this.query);

        } catch (error) {
            console.error('Error in retrieve method:', error.message);
            console.error('Stack Trace:', error.stack);
            throw new Error(`Failed to retrieve data from table ${table}: ${error.message}`);
        }

    }
/*
   async insert(table, insert_data) {
        try {
            if (!this.sqlInsert) {
                throw new Error('sqlInsert is not defined');
            }
            this.query = this.sqlInsert.into(table).set(insert_data).build();
            return await this.ObjDatabase.query(this.query);
        } catch (error) {
            console.error('Error in insert method:', error.message);
            throw new Error(`Failed to insert data into table ${table}: ${error.message}`);
        }
    }
        */
    async insert(table, insert_data) {
        try {
            if (!table || typeof table !== 'string') {
                throw new Error('Invalid table name provided.');
            }
            if (!insert_data || typeof insert_data !== 'object') {
                throw new Error('Invalid data provided. Expected an object.');
            }
    
            const columns = Object.keys(insert_data).map(col => `\`${col}\``).join(', ');
            const values = Object.values(insert_data).map(val => `'${val}'`).join(', ');
            this.query = `INSERT INTO \`${table}\` (${columns}) VALUES (${values})`;
    
            return await this.ObjDatabase.query(this.query);
        } catch (error) {
            console.error('Error in insert method:', error.message);
            throw new Error(`Failed to insert data into table ${table}: ${error.message}`);
        }
    }
    
    

    update(table, update_data, condition) {

    }

    async list() {
        console.log('Loading model');
        try {
            const ObjDatabase = await new Database();
            return await ObjDatabase.query('SELECT * FROM `register`');
        } catch (error) {
            console.error("Error:", error);
            throw error;
        }
    }
}
module.exports = AdminModel;