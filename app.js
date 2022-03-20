var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var mysql = require('mysql')

var connection = mysql.createConnection({
    host : 'localhost',
    port: 3306,
    user : 'root',
    password : '4612',
    database : 'sample1'
})

connection.connect();

app.listen(8088,function(){
    console.log("start server 8088!")
})

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine','ejs')

app.get('/', function(req,res){
    res.send("<h1>hello world</h1>")
})

app.get('/main',function(req,res){
    res.sendFile(__dirname+"/public/main.html")
})

// app.post('/email',function(req,res){ // post 기본 요청 처리 
//     console.log(req.body.email)
//     res.send("<h1>Welcome "+req.body.email+"</h1>")
// })

app.post('/email',function(req,res){ // view engine 활용한 방법
    console.log(req.body.email)
    res.render('email.ejs',{'email' : req.body.email})
})

// app.post('/ajax_send_email',function(req,res){
//     console.log(req.body.email)
//     var responseData = {'resule' : 'ok', 'email' : req.body.email}
//     res.json(responseData)
// })

app.post('/ajax_send_email',function(req,res){
    var email = req.body.email;
    var responseData = {};

    var query = connection.query('select name from user where email= '+email+"",function(err, rows){
        if(err) throw err;
        if(rows[0]){
            console.log(rows[0])
            // responseData.result = "ok";
            // responseData.name = rows[0].name;
        }else{
            console.log("none : "+rows[0])
        }
    })
})
