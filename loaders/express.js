const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const logger = require('morgan');
const {SESSION_SECRET} = require('../config')

module.exports = (app) => {
//cors middleware

app.use(cors());

//request body-parsing middleware
//json
app.use(bodyParser.json());

//url-encoded

app.use(bodyParser.urlencoded({extended:true}))

//logger
app.use(logger('dev'));

//session

app.use(session({
    secret: SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
        secure: false,
        maxAge: 60 * 60 * 48 *1000
    }
}));

return app
}