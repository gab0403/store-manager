const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'StoreManager',
  password: '1234',
});

module.exports = connection;
