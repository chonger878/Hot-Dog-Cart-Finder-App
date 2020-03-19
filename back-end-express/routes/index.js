var express = require('express');
var router = express.Router();
var db = require('./db');

/* GET users listing. */
router.get('/carts', function(req, res, next) {
  db.query(`SELECT * FROM Vendors`, (err,rows) => {
    if(err) throw err;

    var resource = rows.map(row => ({
      id: row.VendorID,
      FirstName: row.FirstName, 
      LastName: row.LastName, 
      Phone: row.Phone,
      Email: row.Email,
      Location: row.Location,
      coords: row.coords,
      // iconImage: row.iconImage,
      content: row.content
    }));

    res.send(resource);
  });
});

router.get('/orders', function(req, res, next) {
  db.query(`SELECT * FROM Orders`, (err,rows) => {
    if(err) throw err;

    var resource = rows.map(row => ({
      id: row.OrderID,
      Status: row.Status, 
      CartId: row.CartID, 
      CustomerId: row.CustomerID,
      OrderDate: row.OrderDate,
      Items: row.Items,
    }));

    res.send(resource);
  });
});

router.get('/userOrder/', (req, res, next) => {
	db.query(`SELECT * FROM Orders 
		Join Customers On Customers.CustomerID = Orders.CustomerID 
		JOIN Signin ON Customers.CustomerID = Signin.CustomerID  
		WHERE loginStatus = 1`, (err,rows) => {
			
		if(err) throw err;

		var resource = rows.map(row => ({
      id: row.OrderID,
      Status: row.Status, 
      CartId: row.CartID, 
      CustomerId: row.CustomerID,
      OrderDate: row.OrderDate,
      Items: row.Items,
    }));

    res.send(resource);
  });
});

router.get('/customers', function(req, res, next) {
  db.query(`SELECT * FROM Customers`, (err,rows) => {
    if(err) throw err;

    var resource = rows.map(row => ({
      id: row.CustomerID,
      FirstName: row.FirstName, 
      LastName: row.LastName, 
      Phone: row.Phone,
      Email: row.Email,
    }));

    res.send(resource);
  });
});

router.get('/menu/:id', function(req, res, next) {
  db.query(
    `SELECT * FROM Items 
    JOIN Menu_Item 
    on Items.ItemID = Menu_Item.ItemID 
    JOIN Menu 
    ON Menu.MenuID = Menu_Item.MenuID 
    JOIN Vendors 
    ON Vendors.VendorID = Menu.VendorID
    WHERE Vendors.VendorID = ${req.params.id}`, (err,rows) => {
    if(err) throw err;

    var resource = rows.map(row => ({
      title: row.ItemName, 
      price: row.Price, 
      type: row.Type,
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
      // iconImage: row.iconImage,
      content: row.content
    }));

    res.send(resource);
  });
});

//sign in route grabs data from signin table holding all user login data
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

router.get('/user', (req, res, next) => {
  db.query(`SELECT * FROM Signin WHERE loginStatus = 1`, (err,rows) => {
		if(err) throw err;
		
		var resource = {};

		if (rows) {
			resource = rows.map(row => ({
				id: row.SigninId,
				type: row.Type, 
				Email: row.Email,
				Password: row.Password,
				FirstName: row.FirstName, 
				LastName: row.LastName
			}));
		}


    res.send(resource);
  });  
});

router.post('/signin/:id', (req, res, next) => {
  db.query(`UPDATE Signin SET loginStatus = 1 WHERE SigninId = ${req.params.id}`, (err,rows) => {
    if(err) throw err;

    res.send(rows);
  });
});

router.post('/updateCart/:id', (req, res, next) => {
  var data = {
    FirstName: req.body.firstName, 
    LastName: req.body.lastName,
    Phone: req.body.phone, 
    Email: req.body.email, 
    Location: req.body.location,
    Content: req.body.content,
    coords: req.body.coords
  };

  db.query(`UPDATE Vendors SET ? WHERE VendorID = ${req.params.id}`, data,(err, rows) => {
    if(err) throw err;

    res.send(rows);
  });
});

router.post('/userOut/:id', (req, res, next) => {
  db.query(`UPDATE Signin SET loginStatus = 0 WHERE SigninId = ${req.params.id}`, (err,rows) => {
    if(err) throw err;

    res.send(rows);
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
      
    db.query(`INSERT INTO Signin SET ?`, data,(err, results) => {
      
      if(err) throw err;
      res.send(results);
      res.end('Success');
    });
  });

  router.delete('/carts/:id',(req, res) => {
    var id = req.body.VendorID;

    db.query(`DELETE FROM Vendors WHERE VendorID = ${id};`, (err, results) => {
      
      if(err) throw err;

      res.send(results);
      res.end('Success');
    });
  });

  router.delete('/orders/:id',(req, res) => {
    var id = req.body.OrderID;

    db.query(`DELETE FROM Orders WHERE OrderID = ${id};`, (err, results) => {
      
      if(err) throw err;

      res.send(results);
      res.end('Success');
    });
  });

  router.delete('/customers/:id',(req, res) => {
    var id = req.body.CustomerID;

    db.query(`DELETE FROM Customers WHERE CustomerId = ${id};`, (err, results) => {
      
      if(err) throw err;

      res.send(results);
      res.end('Success');
    });
  });

  router.post('/carts', (req, res) => {
    var data = {
      FirstName: req.body.firstName, 
      LastName: req.body.lastName,
      Phone: req.body.phone, 
      Email: req.body.email, 
      Location: req.body.location,
      content: req.body.content,
      coords: req.body.coords
      };

      db.query(`INSERT INTO Vendors SET ?`, data,(err, results) => {
      
      if(err) throw err;
      res.send(results);
      res.end('Success');
    });
  });

  router.post('/customers', (req, res) => {
    var data = {
      FirstName: req.body.firstName, 
      LastName: req.body.lastName,
      Phone: req.body.phone, 
      Email: req.body.email, 
      };

      db.query(`INSERT INTO Customers SET ?`, data,(err, results) => {
      
      if(err) throw err;
      res.send(results);
      res.end('Success');
    });
  });

module.exports = router;
