const express = require('express');
const path = require('path');
const open = require('open');
const chalk = require('chalk');
const debug = require('debug')('app:src');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const router = require('../src/routes/router.js');
const authRouter = require('../src/routes/authRoutes.js');

const port = 3000;
const app = express();

app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../src/')));
app.set('views', './src/views');
// app.set('view engine', 'ejs');

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
