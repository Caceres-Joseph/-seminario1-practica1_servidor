const express = require('express'),
    app = express(),
    bodyParser = require('body-parser');
port = process.env.PORT || 3000;


var cors = require('cors');

const mysql = require('mysql');
// connection configurations
var mc = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'JhosefCaceres',
    database: 'seminario1'
});

// subir imagen

const fileUpload = require('express-fileupload');

//cors
app.use(cors())
app.use(fileUpload());

app.post('/upload', function (req, res) {
 
    if (Object.keys(req.files).length == 0) {
        return res.status(400).send('No files were uploaded.');
    }

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let sampleFile = req.files.file;  
    //return;
    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv('./app/public/' + sampleFile.name, function (err) {
        if (err)
            return res.status(500).send(err);
        res.send(sampleFile.name);
    });
});

// connect to database
mc.connect();

app.listen(port, function () {
    console.log('CORS-enabled web server listening on port 8000')
});

console.log('API server started on: ' + port);

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// problema con acces

var routes = require('./app/routes/appRoutes'); //importing route
routes(app); //register the route