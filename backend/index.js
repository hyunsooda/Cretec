
const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const router = express.Router();
const app = express();
const session = require('express-session');
const passport = require('passport');
const indexRouter = require('./router');
const history = require('connect-history-api-fallback');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');

require('../src/config/passport')(passport);
require('../src/config/database').init();

// 밑의 2줄 호출순서중요하다... 하
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
    secret: 'sometextgohere',
    saveUninitialized: true,
    resave: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

const staticFileMiddleware = express.static(path.join(__dirname))
app.use(staticFileMiddleware)
app.use(history({
    index: 'index.html'
}));
app.use(staticFileMiddleware);

app.use('/dist', express.static(path.join(__dirname, '../dist')));
app.use('/src/assets',express.static(path.join(__dirname, '../src/assets')));
app.use('/', indexRouter);

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

module.exports = router;




