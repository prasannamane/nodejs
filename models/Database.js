const mysql = require('mysql2');

class Database {
    constructor() {
        try {
            this.connection = mysql.createConnection({
                host: process.env.DB_HOST || 'localhost',
                user: process.env.DB_USER || 'root',
                password: process.env.DB_PASS || 'root',
                database: process.env.DB_NAME || 'event',
                port: process.env.DB_PORT || '8889'
            });
            console.log('Database connected to:', this.connection.config.database);
        } catch (error) {
            console.error('Error establishing database connection:', error);
            throw new Error('Database connection failed. Please check your configuration.');
        }
    }

    query(sql, args = []) {
        console.log('Executing Query:', sql);
        return new Promise((resolve, reject) => {
            this.connection.query(sql, args, (err, rows) => {
                if (err) {
                    console.error('Query Error:', err.message, '\nSQL:', sql);
                    return reject(new Error('Database query failed.'));
                }
                console.log('Query Result:', rows);
                resolve(rows);
            });
        });
    }

    close() {
        return new Promise((resolve, reject) => {
            this.connection.end(err => {
                if (err) {
                    console.error('Error closing connection:', err.message);
                    return reject(new Error('Failed to close database connection.'));
                }
                console.log('Database connection closed.');
                resolve();
            });
        });
    }
}

module.exports = Database;
