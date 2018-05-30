var express           = require("express"),
app                   = express(),
bodyparser            = require("body-parser"),
mongoose              = require("mongoose"),
methodOverride        = require("method-override"),
flash                 = require("connect-flash"),
passport              = require("passport"),
localStrategy         = require("passport-local"),
User                  = require("./models/user"),
session               = require("express-session"),
mongoStore            = require('connect-mongo')(session),
createUser            = require("./models/createUser"),
router                = require("./routes/routes");




mongoose.connect(process.env.DATABASEURL, { useMongoClient: true });

mongoose.Promise = global.Promise;

require('./config/passport')(passport); 


app.use(session({
    secret:"FortheloveofmylifeKhoKha",
    resave: false,
    saveUninitialized: true,
    store: new mongoStore({
    mongooseConnection: mongoose.connection,
    collection: 'sessions' // default
  }),
  cookie: { maxAge: 30 * 60 * 1000 }
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

createUser('M.atout', process.env.FOUNDER_PASSWORD , 'founder');
createUser('viewer', process.env.VIEWER_PASSWORD , 'viewer');

passport.use(new localStrategy(User.authenticate()));

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server Started!!");
});