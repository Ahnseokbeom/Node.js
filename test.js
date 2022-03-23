var express = require('express')
var app = express()
var bodyParser = require('body-parser')


var mysql = require('mysql')

var connection = mysql.createConnection({
host : "localhost",
port : 3306,
user : "SWP",
password : "testing00",
database : "sample1"
})

connection.connect(()=>{
    console.log("connection")
})

console.log("ing");
app.get("/test", function (req, res) {
    // connection.query('select * from user', function (err, rows) {
    connection.query('show databases;', function (err, rows) {
        if (err) {
        console.log("err :"+err)
        }

        console.log('Open DataBase');
        res.send("hello")
        res.json(rows);
    });
});

app.post('/post', (req, res) => {
    console.log('who get in here post /users');
    connection.query('select pc_status from pc ', function (err, rows) {
        if (err) {
        console.log("err :"+err)
        }

        console.log('Open DataBase');
        res.json(rows);
    });
});

app.listen(8888, () => {
    console.log('Example app listening on port 3000!');
});