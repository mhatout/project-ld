var express = require("express");
var app = express();
var bodyparser = require("body-parser");
var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/project-ld', { useMongoClient: true });
mongoose.Promise = global.Promise;

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

app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:true}));
app.set("view engine" , "ejs");


app.get("/", function(req, res){
    res.render("index");
});

/*app.get("/table", function(req, res) {
   res.render("table"); 
});*/

app.post("/table", function(req, res){
    console.log("A request had made to view table");
   res.render("table", {vessels : vessels}); 
});

/*app.post("/search", function(req, res){
    var vessel = req.body.searchinput;
    console.log(vessel);
    res.render("table");
});*/

app.get("*", function(req, res){
    res.send("wrong URL!!!");
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server Started!!");
});