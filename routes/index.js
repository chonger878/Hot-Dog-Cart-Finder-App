var express = require('express');
var router = express.Router();
var db = require('./db');

var queryStr = `SELECT Customers.FirstName, Customers.CustomerID \n
FROM Customers
   JOIN Orders USING(CustomerID) \n
WHERE CustomerID > 2;`;

/* GET home page. */
router.get('/', function(req, res, next) {
  
  var dbReturn = db.query(queryStr, 
    function(error, results, fields){ 
        if(error) throw error;
        
        console.log(results[0]);
        results[0]});

  res.render('index', 
    { 
      title: 'Express',
      body: dbReturn });
});


module.exports = router;
