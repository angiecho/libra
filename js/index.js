var STATUS_GENERIC_ERROR = 500;
var STATUS_DOES_NOT_EXIST = 404;
var STATUS_UNAUTHENTICATED = 401;
var STATUS_UNPROCESSABLE = 422;
var DEFAULT_PORT = 5000;

var express = require('express');
var mysql = require("mysql");
var app = express();
var server = require('http').createServer(app);
var path = require('path');
var assert = require('assert');
var bodyParser = require('body-parser');
var axios = require('axios')

var dburl = "den1.mysql6.gear.host";
var PORT = process.env.PORT || DEFAULT_PORT;

var con = mysql.createConnection({
  host: dburl,
  user: "website01",
  password: "libra~2018",
  database : "libra"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

app.use(express.static(__dirname + '/../'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded())
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res){
  res.sendFile(__dirname + '/../index.html');
});

app.get("/measurement", function(req, res){
  var dbID = req.query.dbID;
  var sql = "SELECT * FROM measurements WHERE ID = " + dbID +";";
  con.query(sql,  function (err, result, fields) {
    if (err) throw err;
    res.json(result);
  })
});

app.get("/bras", function(req, res){
  var band = req.query.band;
  var cup = req.query.cup;
  var sql = "SELECT * FROM bra_t WHERE cup_size = \'" + cup +"\' AND band_size = "+ band +";";

  con.query(sql,  function (err, result, fields) {
    if (err) throw err;
    res.json(result);
  })
});

app.get("/maternity", function(req, res){
  var cup = req.query.cup;
  var sql = "SELECT * FROM bra_t WHERE cup_size = \'" + cup +"\' AND bra_style = 'Nursing & Maternity Bras';";

  con.query(sql,  function (err, result, fields) {
    if (err) throw err;
    res.json(result);
  })
});

app.post("/completeSizing", function(req, res){
  var myPains = JSON.stringify(req.body["pains"]);
  var dbID = req.body["dbID"];
  var sql = "UPDATE measurements SET pain =\'"+ myPains +"\' WHERE ID = " + dbID +";"

  con.query(sql,  function (err, result, fields) {
    if (err) throw err;
    res.json(result);
  })
});

app.post("/sizing2", function(req, res){
  var age = req.body["age"];
  var isPregnant = 0;
  var isFeeding = 0;
  var wasPregnant = 0;
  var band = req.body["size"]["row1"]["band"];
  var cup = req.body["size"]["row1"]["cup"];
  var side = req.body["sideview"];
  var front = req.body["separation"];

  var pregnancy = req.body["maternity"];
  if (pregnancy != null){
    for (var i = 0; i < pregnancy.length; i++){
      if (pregnancy[i] == "isPregnant")
        isPregnant = 1;
      if (pregnancy[i] == "isFeeding")
        isFeeding = 1;
      if (pregnancy[i] == "wasPregnant")
        wasPregnant = 1;
    }
  }

  //'INSERT INTO' + USER +'SET username=?,passsword=?,name=?,picture=?',[username,password,name,picture]

  var sql = "INSERT INTO measurements (age_range, isPregnant, isFeeding, wasPregnant, ";
  sql = sql + "cup, band, side, front) VALUES ("+age+","+ isPregnant + ","+ isFeeding + ","+ wasPregnant + ",";
  sql = sql +"\'" +cup +"\'" + "," + band  + ","  +"\'" + side  +"\'" + ","  +"\'"+ front  +"\'"+ ");";
  //console.log(sql);
  con.query(sql,  function (err, result, fields) {
    if (err) throw err;
  })
  con.query("SELECT LAST_INSERT_ID();",  function (err, result, fields) {
    if (err) throw err;
    //console.log("ID" + result.data);
    res.json(result);
  })
});

server.listen(PORT);
console.log('Open on port:' + PORT);
