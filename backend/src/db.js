const { Pool } = require('pg');

const pool = new Pool({
  user: 'krishav',
  host: 'db',
  database: 'postgres',
  password: 'qwerty',
  port: 5432,
});

pool.connect()
  .then(() => {
    console.log('PostgreSQL connected successfully');
  })
  .catch((error) => {
    console.error('PostgreSQL connection error:', error);
  });

module.exports = pool;
