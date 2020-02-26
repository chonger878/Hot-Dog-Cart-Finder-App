var express = require('express');
var router = express.Router();
var db = require('./db');

/* GET users listing. */
router.get('/', function(req, res, next) {
  var resourceKey = 'vendors';
  
  db.query(`SELECT * FROM ${resourceKey}`, (err,rows) => {
    if(err) throw err;

    var resource = rows.map(row => ({FirstName: row.FirstName, LastName: row.LastName, Phone: row.Phone}));

    res.send(resource);
  });
});

module.exports = router;
