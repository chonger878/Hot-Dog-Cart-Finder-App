var express = require('express');
var router = express.Router();
var db = require('./db');

//----- Moved to index.js route

/* GET users listing. */
//on reload of page(GET), console logs returned.
// router.get('/', function(req, res, next) {
//   var resourceKey = 'Customers';
//   //for now this returns the first users Username and password, but we can change that later
//   db.query(`SELECT Username, Password FROM ${resourceKey} WHERE CustomerID=1`, (err,rows) => {
//     if(err) throw err;
//     console.log(rows);
//     var resource = rows.map(row => ({Username: row.Username, Password: row.Password}));

//     res.send(resource);
//   });
// });

// module.exports = router;
