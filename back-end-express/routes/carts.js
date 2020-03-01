var express = require('express');
var router = express.Router();
var db = require('./db');

/* GET users listing. */
router.get('/', function(req, res, next) {
  var resourceKey = 'vendors';
  
  db.query(`SELECT * FROM ${resourceKey}`, (err,rows) => {
    if(err) throw err;
    console.log(rows)
    var resource = rows.map(row => ({
      id: row.VendorID,
      FirstName: row.FirstName, 
      LastName: row.LastName, 
      Phone: row.Phone,
      Email: row.email,
      coords: row.coords,
      iconImage: row.iconImage,
      content: row.content
    }));

    res.send(resource);
  });
});

module.exports = router;
