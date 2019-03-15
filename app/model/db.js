'user strict';

var mysql = require('mysql');

//local mysql db connection
var connection = mysql.createConnection({
    host     : 'tutorial-db-instance.cricycwjc8nr.us-east-2.rds.amazonaws.com',
    user     : 'tutorial_user',
    password : 'tutorial_user',
    database : 'seminario1'
});

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;