const mysql = require('mysql2');

class Database {
    constructor() {
        this.connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'event',
            port: '8889'
        });
        console.log('databse')
    }

    query(sql, args) {
        console.log('Query')
        return new Promise((resolve, reject) => {
            this.connection.query(sql, args, (err, rows) => {
                if (err) { 
                    //console.log("Err "+ err);
                    return reject(err); 
                }else{
                    //console.log(rows);
                    resolve(rows);
                } 
            });
        });
    }

    close() {
        return new Promise((resolve, reject) => {
            this.connection.end(err => {
                if (err) return reject(err);
                resolve();
            });
        });
    }
}

module.exports = Database;