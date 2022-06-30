const mysql = require('mysql2/promise');
require('dotenv').config();

const connection = mysql.createPool({
  host: 'localhost' || process.env.MYSQL_HOST,
  user: 'root' || process.env.MYSQL_USER,
  port: 3306 || process.env.PORT,
  database: 'StoreManager' || process.env.MYSQL_DATABASE,
  password: '1234' || process.env.MYSQL_PASSWORD,
});

module.exports = connection;
