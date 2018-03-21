var STATUS_GENERIC_ERROR = 500;
var STATUS_DOES_NOT_EXIST = 404;
var STATUS_UNAUTHENTICATED = 401;
var STATUS_UNPROCESSABLE = 422;
var DEFAULT_PORT = 5000;

var express = require('express');
var app = express();
var server = require('http').createServer(app);
var path = require('path');
var assert = require('assert');
var bodyParser = require('body-parser');

var PORT = process.env.PORT || DEFAULT_PORT;


app.use(express.static(__dirname + '/../'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + '/../index.html');
});

server.listen(PORT);
console.log('Open on port:' + PORT);
