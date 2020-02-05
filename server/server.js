const express = require('express');
const app = express();

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