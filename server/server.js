const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const compression = require('compression');
const cors = require('cors');
const helpers = require('../helpers');

const todos = require('./components/todos/todos');

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(express.static(helpers.root('dist')));
app.use(cookieParser());

app.use('/api/todos', todos);

app.all('*', (req, res, next) => {
    res.sendFile('index.html', {
        root: helpers.root('dist')
    });
});

module.exports = app;