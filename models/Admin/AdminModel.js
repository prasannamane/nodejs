const sql = require('sql-query');
const Database = require('../Database');

class DatabaseOperationError extends Error {
    constructor(message, cause) {
        super(message);
        this.cause = cause;
        this.name = 'DatabaseOperationError';
    }
}

class NetworkError extends Error {
    constructor(message, cause) {
        super(message);
        this.cause = cause;
        this.name = 'NetworkError';
    }
}

class AdminModel {
    constructor() {
        this.ObjDatabase = new Database();
        this.sqlQuery = sql.Query(); // Initialize the Query builder
        this.query = null;
    }

    async retrieve(table, condition) {
        try {
            if (!table || typeof table !== 'string') {
                throw new Error('Invalid table name provided.');
            }
            if (!condition || typeof condition !== 'object') {
                throw new Error('Invalid condition provided. Expected an object.');
            }

            // Build the SELECT query
            this.query = this.sqlQuery.select()
                .from(table)
                .where(condition)
                .build();

            console.log('Generated Query:', this.query);
            return await this.ObjDatabase.query(this.query);
        } catch (error) {
            console.error('Error in retrieve method:', error.message);
            console.error('Stack Trace:', error.stack);
            throw new Error(`Failed to retrieve data from table ${table}: ${error.message}`);
        }
    }

    async insert(table, insert_data) {
        try {
            if (!table || typeof table !== 'string') {
                throw new Error('Invalid table name provided.');
            }
            if (!insert_data || typeof insert_data !== 'object') {
                throw new Error('Invalid data provided. Expected an object.');
            }

            // Build the INSERT query
            this.query = this.sqlQuery.insert()
                .into(table)
                .set(insert_data)
                .build();

            console.log('Generated Query:', this.query);
            return await this.ObjDatabase.query(this.query);
        } catch (error) {
            console.error('Error in insert method:', error.message);
            throw new Error(`Failed to insert data into table ${table}: ${error.message}`);
        }
    }

    async login(table, fetch_data) {
        try {
            if (!table || typeof table !== 'string') {
                throw new Error('Invalid table name provided.');
            }
            if (!fetch_data || typeof fetch_data !== 'object') {
                throw new Error('Invalid data provided. Expected an object.');
            }

            // Build the SELECT query for login
            this.query = this.sqlQuery.select()
                .from(table)
                .where(fetch_data)
                .build();

            console.log('Generated Query:', this.query);
            return await this.ObjDatabase.query(this.query);
        } catch (error) {
            console.error('Error in login method:', error.message);
            throw error;
        }
    }

    update(table, update_data, condition) {
        try {
            // Implementation for update logic
        } catch (error) {
            console.error('Error in update method:', error.message);
        }
    }

    async list() {
        console.log('Loading model');
        try {
            return await this.ObjDatabase.query('SELECT * FROM `register`');
        } catch (error) {
            console.error('Error in list method:', error);
            throw error;
        }
    }
}

module.exports = AdminModel;
