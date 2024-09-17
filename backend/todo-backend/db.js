const mysql = require('mysql2'); 
const pool = mysql.createPool({ 
 host: 'localhost', // your MySQL host 
 user: 'root', // your MySQL user 
 password: '123456789.', // your MySQL password 
 database: 'todo_app' // your database name 
}); 
module.exports = pool.promise(); 
