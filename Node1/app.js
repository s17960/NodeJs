var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.set("view engine", "ejs");
app.use(express.static(__dirname + '/views'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// ---------------------------------------------------------
app.get('/', function(req, res) {
    res.render('index');
});

app.get('/hello', function(req, res) {
    res.send('Hello World!');
});

app.get('/form', function(req, res){
    res.render('form');
});

app.post('/formdata', function(req, res){
    res.send(req.body.name + '<br>' + req.body.surname + '<br>' + req.body.city);
});

app.post('/jsondata', function(req, res){
    res.json(req.body);
})

// ---------------------------------------------------------
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
