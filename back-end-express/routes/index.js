var express = require('express');
var router = express.Router();
var db = require('./db');

var queryStr = `SHOW TABLES`;

/* GET home page. */
router.get('/', function(req, res, next) {
  
  db.query(queryStr, 
    function(error, results, fields){ 
        if(error) throw error;
        
        console.log(results[0]);
        var dbReturn = results;

        res.render('index', 
        { 
          title: 'Express',
          dbReturn
        });
    });
});


module.exports = router;
