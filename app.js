var express = require("express");
var app = express();
var bodyparser = require("body-parser");
var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/project-ld', { useMongoClient: true });
mongoose.Promise = global.Promise;

app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:true}));
app.set("view engine" , "ejs");

var userSchema = new mongoose.Schema({
    username : String,
    password : Number
});
var User = mongoose.model("User" , userSchema);

var vesselSchema = new mongoose.Schema({
    name : String,
    operation : Number,
    status : String,
    supervisor : String,
    purchaser : String,
    reciever : String,
    date : Number
});
var Vessel = mongoose.model("Vessle" , vesselSchema);


var vessels = [{name:"MID FORTUNE",number:"542501",status:"issued"},{name:"NICOLAS DELMAS",number:"542502",status:"in process"},
               {name:"MAERSK TIANJIN",number:"542503",status:"Waiting"}];



app.get("/", function(req, res){
    res.render("index");
});

/*app.get("/table", function(req, res) {
   res.render("table"); 
});*/

app.post("/content", function(req, res){
   console.log(req.body);
   res.render("table", {vessels : vessels}); 
});

app.post("/find", function(req, res){
    console.log(req.body);
    res.render("table", {vessels : vessels});
});

app.get("*", function(req, res){
    res.send("wrong URL!!!");
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server Started!!");
});