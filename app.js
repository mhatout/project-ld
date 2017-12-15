var express = require("express");
var app = express();
var bodyparser = require("body-parser");


app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:true}));
app.set("view engine" , "ejs");

app.get("/", function(req, res){
    res.render("index");
});

app.post("/table", function(req, res){
    console.log("A request had made to view table");
   res.render("table"); 
});

app.get("*", function(req, res){
    res.send("wrong URL!!!");
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server Started!!");
});