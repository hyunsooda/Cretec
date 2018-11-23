const DB_SERVER_PORT='your port'
const DB_HOST= 'your host'
const DB_USER= 'your id'
const DB_PASSWORD= 'your password'
const DB_DATABASE= 'your database'
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
connection2.connect();
connection3.connect();

let arr = [];
let arr2 = [];
let arr3 = [];

console.time('elapsedTime')

for(let i=0; i<10000; i++) { 
    arr.push(new Promise((resolve, reject) => {
        connection.beginTransaction(err => {
            if (err) { throw err; }
            connection.query('SELECT * from test LOCK IN SHARE MODE;' , (err, result) => { 
                if (err) { throw err; }
                connection.query('UPDATE test SET value=value+1 where id=777;', (err, result) => { 
                    if (err) { throw err; }
                    connection.commit(err => {
                        if (err) 
                            return connection.rollback(err => { throw err } );
                        resolve();
                    });
                });
            });
        });
    }));
    arr2.push(new Promise((resolve, reject) => {
        connection.beginTransaction(err => {
            if (err) { throw err; }
            connection.query('SELECT * from test LOCK IN SHARE MODE;' , (err, result) => { 
                if (err) { throw err; }
                connection.query('UPDATE test SET value=value+1 where id=777;', (err, result) => { 
                    if (err) { throw err; }
                    connection.commit(err => {
                        if (err) 
                            return connection.rollback(err => { throw err } );
                        resolve();
                    });
                });
            });
        });
    }));
    arr3.push(new Promise((resolve, reject) => {
        connection.beginTransaction(err => {
            if (err) { throw err; }
            connection.query('SELECT * from test LOCK IN SHARE MODE;' , (err, result) => { 
                if (err) { throw err; }
                connection.query('UPDATE test SET value=value+1 where id=777;', (err, result) => { 
                    if (err) { throw err; }
                    connection.commit(err => {
                        if (err) 
                            return connection.rollback(err => { throw err } );
                        resolve();
                    });
                });
            });
        });
    }));
}

Promise.all(arr,arr2,arr3).then( () => {
    connection.query('select * from test where id=777', (err, result) => {
        console.log(result);
        console.timeEnd('elapsedTime')
        process.exit();
    });
});
