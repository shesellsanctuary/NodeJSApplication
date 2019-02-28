const express = require('express');
const path = require('path');
const debug = require('debug')('app:routes');
const sql = require('mssql');

const router = express.Router();

router.route('/Challenge').get((req, res) => {
  res.sendFile(path.join(__dirname, '../challenge/index.html'));
});

router.route('/Things').get((req, res) => {
  (async function query () {
    const request = new sql.Request();
    const { recordset } = await request.query('select * from things');
    debug(recordset);

    res.render(
      'things',
      {
        title: 'Things',
        things: recordset
      }
    );
  }());
});

router.route('/Things/:id').get((req, res) => {
  (async function query () {
    const { id } = req.params;
    const request = new sql.Request();
    const { recordset } = await request
      .input('id', sql.Int, id)
      .query('select * from things where id = @id');

    res.render(
      'thing',
      {
        title: 'Thing',
        thing: recordset[0]
      }
    );
  }());
});

router.route('/').get((req, res) => {
  res.sendFile(path.join(__dirname, '../views/index.html'));
});

module.exports = router;
