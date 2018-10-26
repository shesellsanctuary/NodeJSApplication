const express = require('express');
const path = require('path');
const open = require('open');
const chalk = require('chalk');
const debug = require('debug')('app:src');
const morgan = require('morgan');

const port = 3000;
const app = express();

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '../src/')));
app.set('views', '../src/views');
app.set('view engine', 'ejs');

app.get('/Challenge', function(req,res) {
    res.sendFile(path.join(__dirname, '../src/index.html'));
});

app.get('/', function(req,res) {
    res.render('index', {list: ['a', 'b'], title: 'My App'});
});

app.listen(port, function(err){
    if(err) {
        debug(err);
    } else {
        //open(`http://localhost:${port}/`); // opens browser automaticaly
        debug(`Listening on port ${chalk.green(port)}`);
    }
})

