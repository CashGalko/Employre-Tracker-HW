const mysql = require("mysql");


const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Svv0rol1@',
    database: 'employee_manager',
});

connection.connect(err => {
    if (err) throw err;
    console.log("Now Listening.");
});

module.exports = connection;