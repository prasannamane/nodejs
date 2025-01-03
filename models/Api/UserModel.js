
const mysql = require('mysql2/promise');

class UserModel {
  constructor(dbConnection) {
    this.connection = dbConnection;
  }

  async createUser(username, email) {
    const [results] = await this.connection.execute(
      'INSERT INTO users SET ?',
      { username, email }
    );
    return results.insertId;
  }

  async getUserById(id) {
    const [rows] = await this.connection.execute(
      'SELECT * FROM users WHERE id = ?',
      [id]
    );
    return rows[0];
  }

  async getAllUsers() {
    const [rows] = await this.connection.execute('SELECT * FROM users');
    return rows;
  }

  async updateUser(id, updates) {
    const [results] = await this.connection.execute(
      'UPDATE users SET ? WHERE id = ?',
      [updates, id]
    );
    return results.affectedRows > 0;
  }

  async deleteUser(id) {
    const [results] = await this.connection.execute(
      'DELETE FROM users WHERE id = ?',
      [id]
    );
    return results.affectedRows > 0;
  }
}

module.exports = UserModel;
