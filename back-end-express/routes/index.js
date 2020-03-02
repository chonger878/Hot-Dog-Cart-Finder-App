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
      Email: row.Email,
      Location: row.Location,
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
      Email: row.Email,
      coords: row.coords,
      iconImage: row.iconImage,
      content: row.content
    }));

    res.send(resource);
  });
});

router.get('/signin', function(req, res, next) {
  var resourceKey = 'Customers';
  //for now this returns the first users Username and password, but we can change that later
  db.query(`SELECT * FROM ${resourceKey} WHERE CustomerID=1`, (err,rows) => {
    if(err) throw err;
    console.log(rows);
    var resource = rows.map(row => (
      {
      FirstName: row.FirstName, 
      LastName: row.LastName, 
      Email: row.Email, 
      Password: row.Password
      }));

    res.send(resource);
  });
});

module.exports = router;
