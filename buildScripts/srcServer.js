var express = require('express');
var path = require('path');
var open = require('open');
var chalk = require('chalk');
var debug = require('debug')('app:src'); // use set DEBUG=app:* & node .\buildScripts\srcServer.js tu run on debug mode

var port = 3000;
var app = express();


app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '../src/')));

app.get('/', function(req,res) {
    res.sendFile(path.join(__dirname, '../src/index.html'));
});

app.listen(port, function(err){
    if(err) {
        console.log(err);
    } else {
        open('http://localhost:' + port);
        debug(`Listening on port ${chalk.green(port)}`);
    }
})

