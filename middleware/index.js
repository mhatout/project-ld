
var middleware = {

/*-------------- check authentication Route ----------------------- */

isLoggedIn: function (req, res, next){
    if (req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

/*----------------------------------------------------------------- */

}

module.exports = middleware; 