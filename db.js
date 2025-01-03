const mysql = require('mysql2/promise');

// Database configuration
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'event',
  port: 8889
};

// Create a singleton instance of the database connection
let dbPool = null;

async function connectToDatabase() {
  if (dbPool) return; // If already connected, do nothing

  try {
    dbPool = await mysql.createConnection(dbConfig);
    console.log(dbPool);

    // Test SELECT query
    //const [results] = await dbPool.query("SELECT * FROM register LIMIT 10");
    //console.log('Test query results:', results);

    process.on('exit', () => dbPool.end());
  } catch (err) {
    console.error('Error connecting to database:', err);
    throw err;
  }
}

module.exports = { connectToDatabase };
