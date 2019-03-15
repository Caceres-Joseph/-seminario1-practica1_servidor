const express = require('express'),
    app = express(),
    bodyParser = require('body-parser');
port = process.env.PORT || 3000;


var cors = require('cors');

const mysql = require('mysql');
// connection configurations
var mc = mysql.createConnection({
    host: 'tutorial-db-instance.cricycwjc8nr.us-east-2.rds.amazonaws.com',
    user     : 'tutorial_user',
    password : 'tutorial_user',
    database : 'seminario1'
});

// subir imagen
const fileUpload = require('express-fileupload');

// Load the SDK and UUID
var AWS = require('aws-sdk');
var uuid = require('uuid');




//cors
app.use(cors())
app.use(fileUpload());

app.post('/upload', function (req, res) {

    if (Object.keys(req.files).length == 0) {
        return res.status(400).send('No files were uploaded.');
    }

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let sampleFile = req.files.file;

    /*
    +------------
    | Guardando
    +------------
    */

    // Create unique bucket name
    var bucketName = uuid.v4();
    // Create name for uploaded object key
    var keyName = sampleFile.name
    // Create a promise on S3 service object
    var bucketPromise = new AWS.S3({
        apiVersion: '2006-03-01'
    }).createBucket({
        Bucket: bucketName
    }).promise();
    // Handle promise fulfilled/rejected states
    bucketPromise.then(
        function (data) {
            // Create params for putObject call
            var objectParams = {
                Bucket: bucketName,
                Key: keyName,
                Body: sampleFile.data,
                ACL: 'public-read'
            };
            // Create object upload promise
            var uploadPromise = new AWS.S3({
                apiVersion: '2006-03-01'
            }).putObject(objectParams).promise();
            uploadPromise.then(
                function (data) {
                    console.log("Successfully uploaded data to " + bucketName + "/" + keyName);
                });
        }).catch(
        function (err) {
            console.error(err, err.stack);
        });

    console.log("Se guard el bucket jejejeje");


    res.send(bucketName + "/" + keyName);

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