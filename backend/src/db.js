const { Pool } = require('pg');

const pool = new Pool({
  user: 'krishav', // Replace with your PostgreSQL username
  host: 'localhost', // Use 'postgres-container' if using Docker
  database: 'postgres',
  password: 'qwerty', // Replace with your PostgreSQL password
  port: 5432, // Default PostgreSQL port
});

pool.connect()
  .then(() => {
    console.log('PostgreSQL connected successfully');
  })
  .catch((error) => {
    console.error('PostgreSQL connection error:', error);
  });

module.exports = pool;
