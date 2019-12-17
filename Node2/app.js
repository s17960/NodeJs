var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var greeter = require('./greeter.js');
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost/TIN';

app.set("view engine", "ejs");
app.use(express.static(__dirname + '/views'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// ---------------------------------------------------------

app.get("/HelloWorld!", function(req, res){
    res.send("Hello World!");
    greeter.greetings();
});

var str = "";
app.get("/", function(req, res){
    MongoClient.connect(url, function(err, client){
        var db = client.db('TIN');
        var collection = db.collection('Osoba');
        //var cursor = collection.find({Imie:"Marcin"});
        var cursor = collection.find();
        
        str = "";
        var i = 1;
        cursor.each(function(err, item){
            if(item != null){
                //console.log(item);
                str += i + '. ' + item.Imie + ' ' + item.Nazwisko + ' ' + item.Miasto + '<br>';
                i++;
            }
        });
    });
    res.send('<a href="/form">Formularz</a><br>' + str);
});

app.get('/form', function(req, res){
    res.render('form');
});

app.post('/form', function(req, res){
    var imie = req.body.name;
    var nazwisko = req.body.surname;
    var miasto = req.body.city;

    MongoClient.connect(url, function(err, client){
        var db = client.db('TIN');
        var collection = db.collection('Osoba');
        
        collection.insertOne({Imie:imie,Nazwisko:nazwisko,Miasto:miasto}, function(err, res){
            if (err) throw err;
            console.log("Inserted!");
        });
    });
    res.redirect('/');
});



// ---------------------------------------------------------
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
  }); 