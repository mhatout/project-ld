
var User = require("./user");

module.exports = function(username, password, accessLevel) {

		// find a user whose username is the same as the forms username
		// we are checking to see if the user trying to login already exists
        User.findOne({ 'username' :  username }, function(err, user) {
            // if there are any errors, return the error
            if (err)
                throw err;

            // check to see if theres already a user with that email
            if (user) {
                return;
            } else {

				// if there is no user with that email
                // create the user
                var newUser               = new User();

                // set the user's local credentials
                newUser.username    = username;
                newUser.password    = newUser.generateHash(password); // use the generateHash function in our user model
                newUser.accessLevel = accessLevel;

				// save the user
                newUser.save(function(err) {
                    if (err)
                        throw err;
                    return newUser;
                });
            }

        });

    }