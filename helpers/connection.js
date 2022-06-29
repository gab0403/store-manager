const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  host: process.env.MYSQL_HOST || 'localhost',
  user: 'root',
  port: 3306,
  database: 'StoreManager',
  password: '1234',
});

module.exports = connection;
