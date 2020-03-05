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
      Email: row.Location,
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

//sign in route grabs data from signin table holding all user login data
router.get('/signin', (req, res, next) => {
  db.query(`SELECT * FROM Signin`, (err,rows) => {
    if(err) throw err;
    console.log(rows);
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

    //route for signup inserting data to Signin table
    router.post('/signup',(req, res) => {
      var data = {
        SigninId: req.body.SigninId, 
        Permission: req.body.Permission,
        Type: req.body.Type, 
        Email: req.body.Email, 
        Password: req.body.Password, 
        FirstName: req.body.FirstName, 
        LastName: req.body.LastName
       };
       
      let sql = `INSERT INTO Signin SET ?`;
      db.query(`INSERT INTO Signin SET ?`, data,(err, results) => {
        
        if(err) throw err;
        res.end('Success');
      });
    });

module.exports = router;
