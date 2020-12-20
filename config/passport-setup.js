const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy
const keys = require("./keys");
const User = require("../models/user-model");
var mongoose = require("mongoose");

passport.serializeUser((user, done) => {
    done(null, user.id);
});
// browser sends cookie back and passing in user id
passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});
passport.use(
    new GoogleStrategy({
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
        callbackURL: "https://reginalds-nest.herokuapp.com/home"
    }, (accessToken, refreshToken, profile, done) => {
        console.log("tokens", accessToken, refreshToken);
        //  check if user already exists in our db
        console.log("authnticate with google");
        User.findOne({ googleId: profile.id }).then((currentUser) => {
            if (currentUser) {
                // already have the user
                console.log("user is: ", currentUser);
                done(null, currentUser);
            } else {
                // if not, then create user in our db
                new User({
                    username: profile.displayName,
                    googleId: profile.id
                }).save().then((newUser) => {
                    console.log("new user created: " + newUser);
                    done(null.newUser);
                });
            }
        });
    })
)
