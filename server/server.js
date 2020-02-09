const express = require('express');
const app = express();


const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'hotDog'
});

connection.connect(function(err){
    if(err){
        console.error('error on connection: '+err.stack);
        return;
    }
    console.log('connection on '+connection.threadId);
});


let customers = require('./data/customers.json');
let vendors = require('./data/vendors.json');

/*
things we need to support:
- sign in => POST => success/fail
- sign up => POST => user
- vendors/:vendorId => GET => vendor
- customers/:customerId => Get => customer
...
*/

var queryStr = `SELECT Customers.FirstName, Customers.CustomerID \n
FROM Customers
   JOIN Orders USING(CustomerID) \n
WHERE CustomerID > 2;`;

app.get('/', (req, res) => {
    // make and return query as 'results'
    connection.query(queryStr, 
    function(error, results, fields){ 
        if(error) throw error;
        console.log(results[0]);
        res.send(results[0])});
})

app.post('/signin', (req, res) => {
    // validate username/password
})

app.post('/signup', (req, res) => {
    // push to data
})

app.get('/vendors', (req, res) => {
    // return vendors or find vendor
});

app.get('/customers', (req, res) => {
    // return customers or find customer
});

var port = process.env.PORT || 3000;

app.listen(port, () => console.log(`server is running on port ${port}`));