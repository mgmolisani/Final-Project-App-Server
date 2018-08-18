const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const userService = require('./services/user');
const eventService = require('./services/event');
const commentService = require('./services/comment');

mongoose.connect(
    process.env.MONGODB_URI ? process.env.MONGODB_URI : 'mongodb://heroku_5383nmr9:t7n70ao1ahdoefr648tq84sunh@ds121312.mlab.com:21312/heroku_5383nmr9'
);
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'App secret'
}));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin",
        ["https://mmolisani-final-project-cs5610.herokuapp.com"]);
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

function setSession(req, res) {
    const name = req.params['name'];
    req.session[name] = req.params['value'];
    res.send(req.session);
}

function getSession(req, res) {
    const name = req.params['name'];
    const value = req.session[name];
    res.send(value);
}

app.get('/api/session/set/:name/:value', setSession);
app.get('/api/session/get/:name', getSession);

userService(app);
eventService(app);
commentService(app);

const port = process.env.PORT || 4200;

app.listen(port, () => console.log('Example app listening on port ' + port + '!'));
