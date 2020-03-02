var express = require('express');
var router = express.Router();
var db = require('./db');

/* GET users listing. */
router.get('/carts', function(req, res, next) {
  db.query(`SELECT * FROM vendors`, (err,rows) => {
    if(err) throw err;

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

router.get('/carts/:id', function(req, res, next) {
  db.query(`SELECT * FROM vendors WHERE VendorID = ${req.params.id}`, (err,rows) => {
    if(err) throw err;
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
