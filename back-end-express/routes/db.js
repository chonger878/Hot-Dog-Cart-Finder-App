/* MySQL CONNECTION
 * HotDog.sql >> 'hotDog' DATABASE REQUIRED
 * Run as root
 * Password root
 * Port 3306
 */

const mysql = require('mysql');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'hotDog'
});

db.connect(function(err){
    if(err){
        console.error('error on connection: '+ err.stack);
        return;
    }
    console.log('connection on '+ db.threadId);
});

module.exports = db;