class UserModels {

    constructor(pool) {
        this.pool = pool;
        console.log("pool", pool);
      }
    

    async getAllUsers() {

        try {
            const result = await this.pool.query('SELECT * FROM register');
            console.log(result.rows);
            return result.rows;
          } catch (error) {
            console.error('Error fetching all users:', error);
            if (error.code === 'ECONNREFUSED') {
              console.error('Database connection refused. Is the server running?');
            }
            throw error;
          }
    }

    async createUser(userData) {
        try {
            const result = await this.pool.query(
                'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
                [userData.name, userData.email, userData.password]
            );
            return result.rows[0];
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    }

    async updateUser(userId, userData) {
        try {
            const result = await this.pool.query(
                'UPDATE users SET name=$1, email=$2, password=$3 WHERE id=$4 RETURNING *',
                [userData.name, userData.email, userData.password, userId]
            );
            return result.rows[0];
        } catch (error) {
            console.error('Error updating user:', error);
            throw error;
        }
    }

    async deleteUser(userId) {
        try {
            const result = await this.pool.query(
                'DELETE FROM users WHERE id=$1 RETURNING *',
                [userId]
            );
            return result.rows[0];
        } catch (error) {
            console.error('Error deleting user:', error);
            throw error;
        }
    }

    async getUserById(userId) {
        try {
            const result = await this.pool.query(
                'SELECT * FROM users WHERE id=$1',
                [userId]
            );
            return result.rows[0];
        } catch (error) {
            console.error('Error getting user by id:', error);
            throw error;
        }
    }

    async getUsersByEmail(email) {
        try {
            const result = await this.pool.query(
                'SELECT * FROM users WHERE email=$1',
                [email]
            );
            return result.rows[0];
        } catch (error) {
            console.error('Error getting user by email:', error);
            throw error;
        }
    }

    async searchUsers(query) {
        try {
            const result = await this.pool.query(
                'SELECT * FROM users WHERE LOWER(name) LIKE $1 OR LOWER(email) LIKE $2',
                [`%${query.toLowerCase()}%`, `%${query.toLowerCase()}%`]
            );
            return result.rows;
        } catch (error) {
            console.error('Error searching users:', error);
            throw error;
        }
    }

    async countUsers() {
        try {
            const result = await this.pool.query(
                'SELECT COUNT(*) FROM users'
            );
            return result.rows[0].count;
        } catch (error) {
            console.error('Error counting users:', error);
            throw error;
        }
    }

    async insert(table, insertData) {
        try {
            const result = await this.pool.query(
                `INSERT INTO ${table} (${Object.keys(insertData).join(', ')}) VALUES (${Object.values(insertData).map(v => `'${v}'`)}) RETURNING *`,
                Object.entries(insertData)
            );
            return result.rows[0];
        } catch (error) {
            console.error(`Error inserting into table ${table}:`, error);
            throw error;
        }
    }

    async update(table, updateData, condition) {
        try {
            const result = await this.pool.query(
                `UPDATE ${table} SET ${Object.entries(updateData)
                    .map(([key, value]) => `${key}=$${value === null ? 'NULL' : `'${value}'`}`)
                    .join(', ')} WHERE ${Object.entries(condition).map(([key, value]) => `${key}=$${value === null ? 'NULL' : `'${value}'`}`).join(' AND ')}`,
                Object.values(updateData).concat(Object.values(condition))
            );
            return result.rows[0];
        } catch (error) {
            console.error(`Error updating table ${table}:`, error);
            throw error;
        }
    }

    async delete(table, condition) {
        try {
            const result = await this.pool.query(
                `DELETE FROM ${table} WHERE ${Object.entries(condition)
                    .map(([key, value]) => `${key}=$${value === null ? 'NULL' : `'${value}'`}`)
                    .join(' AND ')}`,
                Object.values(condition)
            );
            return result.rows[0];
        } catch (error) {
            console.error(`Error deleting from table ${table}:`, error);
            throw error;
        }
    }

    async get(table, condition) {
        try {
            const result = await this.pool.query(
                `SELECT * FROM ${table} WHERE ${Object.entries(condition)
                    .map(([key, value]) => `${key}=$${value === null ? 'NULL' : `'${value}'`}`)
                    .join(' AND ')}`,
                Object.values(condition)
            );
            return result.rows[0];
        } catch (error) {
            console.error(`Error getting from table ${table}:`, error);
            throw error;
        }
    }

    async getAll(table) {
        try {
            const result = await this.pool.query(
                `SELECT * FROM ${table}`
            );
            return result.rows;
        } catch (error) {
            console.error(`Error fetching all from table ${table}:`, error);
            throw error;
        }
    }
}


module.exports = UserModels;
