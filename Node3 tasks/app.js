var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var url = 'mongodb://localhost:27017/TIN';
var mongoose = require('mongoose');
var methodOverride = require('method-override');

var Task = require('./models/Task.js');

app.set("view engine", "ejs");
app.use(express.static(__dirname + '/views'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(methodOverride('_method'));

mongoose.connect(url, function(err){
    if(err == null) console.log("Connection succesful!");
});

// ---------------------------------------------------------

app.get("/", function(req, res){
    Task.find({IsDone: false}, function(err, tasks){
        res.render("index", {tasks: tasks});
    });
});

app.get("/done", function(req, res){
    Task.find({IsDone: true}, function(err, tasks){
        res.render("done", {tasks: tasks});
    });
});

app.post("/addTask", function(req, res){
    if(req.body.task != "")
    Task.create({Text: req.body.task, IsDone: false}, function(){
        res.redirect("/");
    });
    else {
        res.redirect("/");
    }
        
});

app.put("/doneTask/:id", function(req, res){
    Task.updateOne({_id: req.params.id}, {$set:{IsDone: true}}, function(){
        res.redirect("/");
    });
});

app.delete("/clearDone", function(req, res){
    Task.deleteMany({IsDone: true}, function(){
        res.redirect("/done");
    });
});

// ---------------------------------------------------------

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
  }); 