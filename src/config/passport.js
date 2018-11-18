const localStrategy = require('passport-local').Strategy;
const connection = require('./database').connection;
const bcrypt = require('bcrypt-nodejs');

module.exports = (passport) => {
    // 초기에 로그인되면 serialize를 통해 세션에 user.id를 등록한다
    passport.serializeUser( (user, done) => {          
        done(null, user.id);
    });
    // serialize가 한번되고난후부터는 deserializeUser만 호출되며 세션에 등록된 user.id가 1번째파라미터인 id이다.
    passport.deserializeUser( (id, done) => {
        connection.query(`select * from customer where id = '${id}'`, (err, result) => {
            if(!err) {
                done(null, result[0]);
            }
        })
    });
    
    passport.use('local-login', new localStrategy({
        usernameField: 'ID',  // input 태그의 name과 매칭이되야함
        passwordField: 'PASSWORD',
        passReqToCallback: true,
    }, (req, id, password, done) => {
        process.nextTick(() => {
            connection.query(`select * from customer where id = '${id}'`, (err, result) => {
                if(!err) {
                    if(bcrypt.compareSync(password, result[0].pswd)) {
                        return done(null, result[0]);
                    } else 
                        return done(null, false);
                }
            });
        });
    }));

    passport.use('local-signup', new localStrategy({
        usernameField: 'ID',
        passwordField: 'PASSWORD',
        passReqToCallback: true
    }, (req, id, password, done) => {
        process.nextTick(() => {
            connection.query('select * from customer', (err, row, fields) => {
                const r = row.filter(r => id === r.id);
                const body = req.body;
                if(!r.length) {
                    password = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
                    // console.log(`insert into Customer values ('${id}', '${password}', '${body.ADDRESS}', '${body.PHONE}', '${body.SEX}', ${body.AGE}, '${body.NAME}', '${body.JOB}', '${body.TYPE}') `)
                    connection.query(`insert into Customer values ('${id}', '${password}', '${body.ADDRESS}', '${body.PHONE}', '${body.SEX}', ${body.AGE}, '${body.NAME}', '${body.JOB}', '${body.TYPE}') `, (err, result) => {
                        console.log('생성와료');
                        body.id = body.ID;
                        delete body.ID;
                        done(null, body);
                    });
                } else { // 이미 디가 존재한다면
                    console.log('야이디이미존재');
                    return done(null, false);
                }
            }); 
        });
    }));

}