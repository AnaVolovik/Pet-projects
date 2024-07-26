// db.js
const mysql = require('mysql');
const util = require('util'); // Для промисификации функций

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'dogs'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database.');
});

// Промисифицируйте db.query
db.query = util.promisify(db.query).bind(db);

module.exports = db;