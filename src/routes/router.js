const express = require('express');
const path = require('path');
const router = express.Router();

router.route('/Challenge').get((req, res) => {
  res.sendFile(path.join(__dirname, '../challenge/index.html'));
});

router.route('/').get((req, res) => {
  res.sendFile(path.join(__dirname, '../views/index.html'));
});

module.exports = router;
