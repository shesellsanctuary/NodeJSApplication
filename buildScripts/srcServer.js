const express = require('express');
const path = require('path');
const open = require('open');
const chalk = require('chalk');
const debug = require('debug')('app:src');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const router = require('../src/routes/router.js');
const authRouter = require('../src/routes/authRoutes.js');
const sql = require('mssql');

const port = 3000;
const app = express();

const config = {
  user: 'calvet',
  password: 'headache1!',
  server: 'nodejsapplication.database.windows.net',
  database: 'NodeJSApplicationDB',

  options: {
    encrypt: true
  }
};

sql.connect(config).catch(err => debug(err));
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../src/')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use('/', router);
app.use('/auth', authRouter);

app.listen(port, function (err) {
  if (err) {
    debug(err);
  } else {
    // open( `http://localhost:${port}/`); // opens browser automaticaly
    debug(`Listening on port ${chalk.green(port)}`);
  }
});
