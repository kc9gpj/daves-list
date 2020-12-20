// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");
var passport = require("passport");
var passportSetup = require("./config/passport-setup.js");
var mongoose = require("mongoose");
var keys = require("./config/keys");
var cookieSession = require("cookie-session");
var app = express();
var bodyParser = require('body-parser');
// Sets up the Express App
// =============================================================

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



// set up view engine


app.set("view engine","html");
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

var PORT = process.env.PORT || 8000;

// Requiring our models for syncing
var db = require("./models");


// Static directory
app.use(express.static("public"));

// Routes
// =============================================================
require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);
app.use("/auth", require("./routes/auth-routes.js"));
app.use("/profile", require("./routes/profile-routes.js"));

// connect to jawsdb here--may need to tweek this a bit to connect our db
mongoose.connect(keys.mongo.dbURI, { useNewUrlParser: true });
     


app.get("/", (req, res) => {
    res.render("login", { user: req.user });
});

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync().then(function () {
  app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  });
});












