var express     = require("express"),
    router      = express.Router(),
    User        = require("../models/user"),
    Vessel      = require("../models/vessel"),
    passport    = require("passport"),
    middleware  = require("../middleware"),
    globalVessels =[];
    
router.get("/", middleware.isLoggedIn, function(req, res){
        
        let now                = new Date().getTime();
        let monthInMillisecond = 30*24*60*60*1000;
        let monthFromNow       = now - monthInMillisecond;
     Vessel.find({created : { $gt: new Date(monthFromNow) }},function(err,vessels){
        
        if(err){
            req.flash("Can't retrive data try again later!!");
        }else{
            vessels = vessels.reverse();
            globalVessels = vessels;
            res.render("index", {vessels : vessels});
        }
    });
});


router.get("/index", middleware.isLoggedIn, function(req, res){

            res.render("index", {vessels : globalVessels});

});
/*------------------ Route to user form --------------------------- */

router.get("/user_form", middleware.isLoggedIn, function(req, res){

      User.find({},function(err,users){
        if(err){
            req.flash("Can't retrive data try again later!!");
        }else{
            res.render("userForm", {users : users});
        }
        });
    });

/*------------------------------------------------------------------*/

/*------------------ Route to user form --------------------------- */

router.get("/vessel_form", middleware.isLoggedIn, function(req, res) {
   res.render("vesselForm"); 
});

/*------------------------------------------------------------------*/

/*---------------- User input Route ------------------------------- */

router.post("/register", middleware.isLoggedIn,
   
   passport.authenticate('local-signup', {
		successRedirect : '/user_form', // redirect to the secure profile section
		failureRedirect : '/user_form', // redirect back to the signup page if there is an error
		failureFlash    : 'That username is already taken.',
		successFlash    : "User created successfully"
	}));

/*------------------------------------------------------------------*/

/*---------------- vessel input Route ----------------------------- */

router.post("/add-vessel", middleware.isLoggedIn, function(req, res) {
   
   Vessel.create(req.body.vessel, function(err,vessel){
       if(err){
           req.flash("error", err.message);
           res.redirect("/");
       }else{
           req.flash("success", "Vessel created successfully..");
           res.redirect("/");
       }
   });
   
});

/*----------------------------------------------------------------- */

/*------------------ User Login Route ----------------------------- */

router.get("/login", function(req, res){
    res.render("login");
});

router.post("/login",passport.authenticate("local-login",{
    successRedirect : "/",
    failureRedirect : "/login",
    failureFlash    : "Invalid username or password",
    successFlash    : "You logged in successfully"
}), function(req, res){
    
});

/*----------------------------------------------------------------- */

/*----------------- User Logout Route ----------------------------- */

router.get("/logout", function(req, res){
    
    req.logout();
    req.flash("success", "You logged out successfully");
    req.session.destroy();
    res.redirect("/login");
});

/*----------------------------------------------------------------- */

/*----------------- User delete Route ----------------------------- */

router.delete("/user/delete", middleware.isLoggedIn, function(req, res) {
    
    User.findByIdAndRemove(req.body.id, function(err){
       if(err){
           req.flash("error", err.message);
           res.redirect("/user_form");
       }else{
           req.flash("success", "User Deleted Successfully");
           res.redirect("/user_form");
       }
   }); 
});

/*----------------------------------------------------------------- */

/*------------------ User edit Routes ----------------------------- */

router.get("/:id/userEdit", middleware.isLoggedIn, function(req, res) {

    User.findById(req.params.id, function(err,foundUser){
        if(err){
            res.redirect("/user_form");
        }else{
            res.render("editUser", {user:foundUser});
        }
    });
});

router.put("/:id/userEdit", middleware.isLoggedIn, function(req, res) {

     User.findByIdAndRemove(req.params.id, function(err){
       if(err){
           req.flash("error", "Something went wrong..try again later");
           res.redirect("/user_form");
       }else{
           
           var newUser            = new User();
                // set the user's local credentials
                newUser.username    = req.body.username;
                newUser.password    = newUser.generateHash(req.body.password); // use the generateHash function in our user model
                newUser.accessLevel = req.body.accessLevel;
                
        newUser.save(function(err) {
                    if (err)
                        return res.redirect("/user_form");
                    req.flash("success", "User edited successfully..");
                    res.redirect("/user_form");
                });
        
       }
   }); 
});

/*----------------------------------------------------------------- */

/*---------------- vessel search Route ---------------------------- */

router.post("/findByDetails", middleware.isLoggedIn, function(req, res){
    
    let foundedVessel =[],
        returnedvessels = [];
    Vessel.find({},function(err,vessels){
        if(err){
            req.flash(err);
        }else{
            returnedvessels = vessels.reverse();
    
        switch (req.body.searchRadioOptions) {
                    case ("name"):
                          for(let i=0; i<returnedvessels.length; i++){
                              if(returnedvessels[i].name === req.body.searchinput){
                                  foundedVessel.push(returnedvessels[i]);
                              }
                          }
                          returnedvessels=foundedVessel;
                          res.redirect("/index");
                        break;
                    case ("status"):
                        for(let i=0; i<globalVessels.length; i++){
                              if(globalVessels[i].status === req.body.searchinput){
                                  foundedVessel.push(globalVessels[i]);
                              }
                          }
                          globalVessels=foundedVessel;
                          res.redirect("/index");
                        
                        break;
                    case ("supervisor"):
                         
                         for(let i=0; i<globalVessels.length; i++){
                              if(globalVessels[i].supervisor === req.body.searchinput){
                                  foundedVessel.push(globalVessels[i]);
                              }
                          }
                          globalVessels=foundedVessel;
                          res.redirect("/index");
                        break;
                    case ("purchaser"):
                        
                        for(let i=0; i<globalVessels.length; i++){
                              if(globalVessels[i].purchaser === req.body.searchinput){
                                  foundedVessel.push(globalVessels[i]);
                              }
                          }
                          globalVessels=foundedVessel;
                          res.redirect("/index");
                        break;    
                    default:
                    
                         for(let i=0; i<returnedvessels.length; i++){
                              if(returnedvessels[i].operation === req.body.searchinput){
                                  foundedVessel.push(returnedvessels[i]);
                              }
                          }
                          globalVessels=foundedVessel;
                          res.redirect("/index");
                }
        }
      });         
    });          
    
router.post("/findByDate", middleware.isLoggedIn, function(req, res){

    var startDate     = Date.parse(req.body.startDate),
        endDate       = Date.parse(req.body.endDate)+86399999,
        foundedVessel=[];
        
   switch (req.body.dateType) {
           
           case ("createdDate"):
               
               Vessel.find({},function(err,vessels){
                         if(err){
                             req.flash("Can't retrive data try again later!!");
                         }else{
                             for (var i in vessels){
                                 
                                 if(Date.parse(vessels[i].created) >= startDate && Date.parse(vessels[i].created) <= endDate){
                                                    foundedVessel.push(vessels[i]);
                                 }
                             }
                             foundedVessel=foundedVessel.reverse();
                             globalVessels = foundedVessel;
                             res.redirect("/index");
                         }
               });
               
               break;
               
           default:
              
              Vessel.find({},function(err,vessels){
                         if(err){
                             req.flash("Can't retrive data try again later!!");
                         }else{
                             for (var i in vessels){
                                 if(vessels[i].deliverDate){
                                   if(Date.parse(vessels[i].deliverDate) >= startDate && Date.parse(vessels[i].deliverDate) <= endDate){
                                                    foundedVessel.push(vessels[i]);
                                   }
                                 }
                             }
                             foundedVessel=foundedVessel.reverse();
                             globalVessels = foundedVessel;
                             res.redirect("/index");
                         }
               });
           
   }
  
});


/*----------------------------------------------------------------- */

/*------------------ vessel edit Route ---------------------------- */
router.get("/:id/edit", middleware.isLoggedIn, function(req, res) {

    Vessel.findById(req.params.id, function(err,foundVessel){
        if(err){
            res.redirect("/");
        }else{
            res.render("editVessel", {vessel:foundVessel});
        }
    });
    
});

router.put("/:id/edit-vessel", middleware.isLoggedIn, function(req, res){
   
    Vessel.findByIdAndUpdate(req.params.id, req.body.vessel, function(err, ubdatedVessel){
        if(err){
            res.redirect("/:id/edit");
        }else{
            res.redirect("/");
        }
    });
});

router.post("/update_status", middleware.isLoggedIn, function(req, res) {
     Vessel.findByIdAndUpdate(req.body.id, {$set: {"status": req.body.status}}, function(err, ubdatedVessel){
        if(err){
            res.redirect("/");
        }else{
            res.redirect("/");
        }
    });
});

router.post("/updateDeliveredVessel", middleware.isLoggedIn, function(req, res) {
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
router.delete("/:id/delete", middleware.isLoggedIn, function(req, res){
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

router.get("*", function(req, res){
    res.send("wrong URL!!!");
});

/*----------------------------------------------------------------- */


// };
module.exports = router;