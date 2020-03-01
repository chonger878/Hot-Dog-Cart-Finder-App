var express = require('express');
var router = express.Router();
var db = require('./db');

/* GET users listing. */
//on reload of page(GET), console logs returned.
router.get('/', function(req, res, next) {
  var resourceKey = 'Customers';
  //for now this returns the first users email and password, but we can change that later
  db.query(`SELECT Email, Password FROM ${resourceKey} WHERE CustomerID=1`, (err,rows) => {
    if(err) throw err;
    console.log('yo',rows);
    var resource = rows.map(row => ({Email: row.Email, Password: row.Password}));

    res.send(resource);
  });
});

module.exports = router;
