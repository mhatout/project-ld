var express    = require("express"),
app            = express(),
bodyparser     = require("body-parser"),
mongoose       = require("mongoose"),
methodOverride = require("method-override");

mongoose.connect('mongodb://localhost/project-ld', { useMongoClient: true });
mongoose.Promise = global.Promise;

app.use(express.static("public"));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.set("view engine" , "ejs");
app.use(methodOverride("_method"));

var userSchema = new mongoose.Schema({
    username : String,
    password : String
});
var User = mongoose.model("User" , userSchema);

var vesselSchema = new mongoose.Schema({
    name : String,
    operation : String,
    status : {type:String, default: "Under Progress"},
    supervisor : String,
    purchaser : String,
    reciever : '',
    deliverDate : String,
    eta : String,
    created : {type:Date, default: Date.now}
});
var Vessel = mongoose.model("Vessel" , vesselSchema);

var hidden = "hide";
var visible = "";
var snackbartxt = "";
var checked = "";
var foundVessels = "";


app.get("/", function(req, res){
    
     Vessel.find({},function(err,vessels){
        if(err){
            console.log("Can't retrive data try again later!!");
        }else{
            res.render("index", {vessels : vessels, snackbartxt:snackbartxt});
        }
    });
});

/*---------------- Route to input forms --------------------------- */

app.post("/form", function(req, res){

 if(req.body.hasOwnProperty("add_vessel")){
     res.render("form", {vessel_input_visibility : visible, user_input_visibility : hidden});
  }else{
     res.render("form", {vessel_input_visibility : hidden, user_input_visibility : visible});}
});

/*------------------------------------------------------------------*/

/*---------------- User input Route ------------------------------- */

app.post("/add-user", function(req, res){
   User.create(req.body.user, function(err,user){
       if(err){
           snackbartxt="Didn't save please try again later!!!";
           res.redirect("/");
       }else{
           res.redirect("/");
       }
   });
});

/*------------------------------------------------------------------*/

/*---------------- vessel input Route ----------------------------- */

app.post("/add-vessel", function(req, res) {
   
   Vessel.create(req.body.vessel, function(err,vessel){
       if(err){
           snackbartxt="Didn't save please try again later!!!";
           res.redirect("/");
       }else{
           res.redirect("/");
       }
   });
   
});

/*----------------------------------------------------------------- */

/*---------------- vessel search Route ---------------------------- */

app.post("/find", function(req, res){
        switch (req.body.searchRadioOptions) {
                    case ("name"):
                        Vessel.find({ 'name' : req.body.searchinput},function(err,foundVessels){
                                if(err){
                                        console.log("Can't retrive data try again later!!");
                                }else{
                                        res.render("index", {vessels : foundVessels, snackbartxt:snackbartxt});
                                }
                        });
                        break;
                    case ("status"):
                        Vessel.find({ 'status' : req.body.searchinput},function(err,foundVessels){
                                if(err){
                                        console.log("Can't retrive data try again later!!");
                                }else{
                                        res.render("index", {vessels : foundVessels, snackbartxt:snackbartxt});
                                }
                        });
                        break;
                    case ("supervisor"):
                         Vessel.find({ 'supervisor' : req.body.searchinput},function(err,foundVessels){
                                if(err){
                                        console.log("Can't retrive data try again later!!");
                                }else{
                                        res.render("index", {vessels : foundVessels, snackbartxt:snackbartxt});
                                }
                         });
                        break;
                    case ("purchaser"):
                         Vessel.find({ 'purchaser' : req.body.searchinput},function(err,foundVessels){
                                if(err){
                                        console.log("Can't retrive data try again later!!");
                                }else{
                                        res.render("index", {vessels : foundVessels, snackbartxt:snackbartxt});
                                }
                         });
                        break;    
                    default:
                         Vessel.find({ 'operation' : req.body.searchinput},function(err,foundVessels){
                                if(err){
                                        console.log("Can't retrive data try again later!!");
                                }else{
                                        res.render("index", {vessels : foundVessels, snackbartxt:snackbartxt});
                                }
                         });
                }
});

/*----------------------------------------------------------------- */

/*------------------ vessel edit Route ---------------------------- */
app.get("/:id/edit",function(req, res) {

    Vessel.findById(req.params.id, function(err,foundVessel){
        if(err){
            res.redirect("/");
        }else{
            res.render("editVessel", {vessel:foundVessel});
        }
    });
    
});

app.put("/:id/edit-vessel", function(req, res){
   
    Vessel.findByIdAndUpdate(req.params.id, req.body.vessel, function(err, ubdatedVessel){
        if(err){
            res.redirect("/:id/edit");
        }else{
            res.redirect("/");
        }
    });
});

app.post("/update_status", function(req, res) {
     Vessel.findByIdAndUpdate(req.body.id, {$set: {"status": req.body.status}}, function(err, ubdatedVessel){
        if(err){
            res.redirect("/");
        }else{
            res.redirect("/");
        }
    });
});

app.post("/updateDeliveredVessel", function(req, res) {
     Vessel.findByIdAndUpdate(req.body.id, {$set: {'status': req.body.status, 'reciever': req.body.reciever, 'deliverDate': req.body.deliverDate }}, function(err, ubdatedVessel){
        if(err){
            res.redirect("/");
        }else{
            res.redirect("/");
        }
    });
});

/*----------------------------------------------------------------- */

/*------------------ vessel delete Route -------------------------- */
app.delete("/:id/delete", function(req, res){
     Vessel.findByIdAndRemove(req.params.id, function(err){
       if(err){
           alert("Error Occured");
           res.redirect("/");
       }else{
           res.redirect("/");
       }
   }); 
   
});
/*----------------------------------------------------------------- */

/*----------------------- Default Route --------------------------- */

app.get("*", function(req, res){
    res.send("wrong URL!!!");
});

/*----------------------------------------------------------------- */

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server Started!!");
});