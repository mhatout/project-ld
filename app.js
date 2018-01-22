var express           = require("express"),
app                   = express(),
bodyparser            = require("body-parser"),
mongoose              = require("mongoose"),
methodOverride        = require("method-override"),
flash                 = require("connect-flash"),
passport              = require("passport"),
localStrategy         = require("passport-local"),
passportLocalMongoose = require("passport-local-mongoose"),
User                  = require("./models/user"),
Vessel                = require("./models/vessel"),
router                = require("./routes/routes");



mongoose.connect(process.env.DATABASEURL, { useMongoClient: true });

mongoose.Promise = global.Promise;

app.use(require("express-session")({
    secret:"For the love of my life KhoKha",
    resave: false,
    saveUninitialized: false
}));
app.use(express.static("public"));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.set("view engine" , "ejs");
app.use(methodOverride("_method"));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});
app.use(router);

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server Started!!");
});