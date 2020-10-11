const mysql = require('mysql2');

const pool = mysql.createPool({
    host: '127.0.0.1',
    port : 3306,
    user: 'root',
    database: 'images',
    password: 'admin'
});

module.exports = pool.promise();