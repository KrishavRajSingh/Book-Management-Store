const pool = require('../db'); // Import your PostgreSQL connection pool

// Function to ensure the 'users' table exists
const createUsersTable = async () => {
    try {
        const query = `
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                username VARCHAR(255) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT NOW()
            );
        `;
        await pool.query(query); // Execute the query to create the table if it doesn't exist
        console.log('Users table ensured to exist.');
    } catch (error) {
        console.error('Error ensuring users table exists:', error);
    }
};

module.exports = createUsersTable;
