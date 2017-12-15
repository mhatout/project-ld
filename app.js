var express = require("express");
var app = express();
var bodyparser = require("body-parser");

var vessels = [{name:"MID FORTUNE",number:"542501",status:"issued"},{name:"NICOLAS DELMAS",number:"542502",status:"in process"},
               {name:"MAERSK TIANJIN",number:"542503",status:"Waiting"}];

app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:true}));
app.set("view engine" , "ejs");


app.get("/", function(req, res){
    res.render("index");
});

app.post("/table", function(req, res){
    console.log("A request had made to view table");
   res.render("table", {vessels : vessels}); 
});

app.get("*", function(req, res){
    res.send("wrong URL!!!");
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server Started!!");
});