const Database = require('../Database');
const sql = require('sql-query');
const sqlQuery = sql.Query(); // for dialect: sql.Query('postgresql')

class Common {

    constructor() {
        this.ObjDatabase = new Database();
        this.sqlSelect = sqlQuery.select();
        this.query;
    }

    // Helper function to validate input
    validateInput(type, value, expectedType) {
        if (typeof value !== expectedType) {
            throw new Error(`Invalid ${type}: ${type} must be a ${expectedType}. Received ${typeof value}.`);
        }
    }

    async retrieve(table, condition) {
        try {

            this.validateInput('Table name', table, 'string');
            this.validateInput('Condition', condition, 'object');
            let whereClause = this.buildWhereClause(condition);
            const query = `SELECT * FROM ${table} WHERE ${whereClause}`;
            const result = await this.ObjDatabase.query(query);
            return result;
        } catch (error) {
            // Differentiating errors for better debugging
            if (error.message.includes('build')) {
                console.error("Query Building Error:", error.message);
            } else if (error.message.includes('query')) {
                console.error("Database Query Execution Error:", error.message);
            } else {
                console.error("Unknown Error in retrieve method:", error.message);
            }

            // Re-throw the error with contextual details
            throw new Error(`Error in retrieve method for table "${table}": ${error.message}`);
        }
    }

    buildWhereClause(condition) {
        let whereClause = [];
        for (const [key, value] of Object.entries(condition)) {
            if (typeof value === 'string') {
                whereClause.push(`${key} = '${value}'`);
            } else if (typeof value === 'number') {
                whereClause.push(`${key} = ${value}`);
            } else if (value === null) {
                whereClause.push(`${key} IS NULL`);
            }
        }
        return whereClause.join(' AND ');
    }

    async insert(table, insert_data) {
        try {
            // Input validation
            this.validateInput('Table name', table, 'string');
            this.validateInput('Insert data', insert_data, 'object');
            
            // Example insert logic (you'll need to implement actual SQL insert logic here)
            const columns = Object.keys(insert_data).join(', ');
            const values = Object.values(insert_data).map(value => `'${value}'`).join(', ');
            const query = `INSERT INTO ${table} (${columns}) VALUES (${values})`;

            console.log("Executing Insert Query:", query);
            const result = await this.ObjDatabase.query(query);
            console.log("Insert Query Result:", result);

            return result;

        } catch (error) {
            console.error("Insert Error:", error.message);
            throw new Error(`Error in insert method for table "${table}": ${error.message}`);
        }
    }

    async update(table, update_data, condition) {
        try {
            // Input validation
            this.validateInput('Table name', table, 'string');
            this.validateInput('Update data', update_data, 'object');
            this.validateInput('Condition', condition, 'object');

            // Example update logic (you'll need to implement actual SQL update logic here)
            const updates = Object.keys(update_data)
                .map(key => `${key} = '${update_data[key]}'`)
                .join(', ');

            const conditionStr = Object.keys(condition)
                .map(key => `${key} = '${condition[key]}'`)
                .join(' AND ');

            const query = `UPDATE ${table} SET ${updates} WHERE ${conditionStr}`;

            console.log("Executing Update Query:", query);
            const result = await this.ObjDatabase.query(query);
            console.log("Update Query Result:", result);

            return result;

        } catch (error) {
            console.error("Update Error:", error.message);
            throw new Error(`Error in update method for table "${table}": ${error.message}`);
        }
    }

    async see() {
        console.log('Loading model');
        try {
            const ObjDatabase = await new Database();

            const result = await ObjDatabase.query('SELECT * FROM `category`');
            console.log("Categories Result:", result);

            return result;

        } catch (error) {
            console.error("See Error:", error.message);
        }
    }
}

module.exports = Common;
