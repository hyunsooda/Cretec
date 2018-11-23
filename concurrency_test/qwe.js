const DB_SERVER_PORT='3306'
const DB_HOST='localhost'
const DB_USER='root'
const DB_PASSWORD='4217'
const DB_DATABASE='testDB'
const mysql = require('mysql');
const connection = mysql.createConnection({
    host     : DB_HOST,
    user     : DB_USER,
    password : DB_PASSWORD,
    port     : DB_SERVER_PORT,
    database : DB_DATABASE
});
const connection2 = mysql.createConnection({
    host     : DB_HOST,
    user     : DB_USER,
    password : DB_PASSWORD,
    port     : DB_SERVER_PORT,
    database : DB_DATABASE
});
const connection3 = mysql.createConnection({
    host     : DB_HOST,
    user     : DB_USER,
    password : DB_PASSWORD,
    port     : DB_SERVER_PORT,
    database : DB_DATABASE
});

connection.connect();
connection.query('select * from test', (err, result) => {
    console.log(result[0]);
    process.exit();
})