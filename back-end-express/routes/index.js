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

router.get('/admin/carts/:id', function(req, res, next) {
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

router.get('/signin', (req, res, next) => {
  db.query(`SELECT * FROM Signin`, (err,rows) => {
    if(err) throw err;

    var resource = rows.map(row => ({
      id: row.SigninId,
      type: row.Type, 
      Email: row.Email,
      Password: row.Password,
      FirstName: row.FirstName, 
      LastName: row.LastName
    }));

    res.send(resource);
  });  
});

module.exports = router;
