
// Requiring our Todo model
var db = require("../models");
var bodyParser = require("body-parser");
var nodemailer = require("nodemailer");


// Routes
// =============================================================
module.exports = function(app) {

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

// user to user email
  app.post('/send', (req, res) => {
    const output = `
      <p>You have a new contact request</p>
      <h3>Contact Details</h3>
      <ul>  
        <li>Name: ${req.body.Name}</li>
        <li>Email: ${req.body.Email}</li>
        <li>Message: ${req.body.Message}</li>
      </ul>
    `;
  const emailTo = `
       ${req.body.ToEmail}
  `
  var transporter = nodemailer.createTransport({
    host: 'smtp.mail.yahoo.com',
    port: 465,
    service:'yahoo',
    secure: false,
    auth: {
      user: 'projectemail1212@yahoo.com',
      pass: '1111asdf'
    },
    debug: false,
    logger: true
  });

  var mailOptions = {
    from: 'projectemail1212@yahoo.com',
    to: emailTo,
    subject: 'daveslist',
    text: 'You have a new daveslist message below:',
    html: output 
  
  };

  console.log(mailOptions);
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  
  });
  res.redirect("/home");
  });

  // contact us email
  app.post('/contactSend', (req, res) => {
    const output = `
      <p>You have a new contact request</p>
      <h3>Contact Details</h3>
      <ul>  
        <li>Name: ${req.body.Name}</li>
        <li>Email: ${req.body.Email}</li>
        <li>Message: ${req.body.Message}</li>
      </ul>
    `;

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'hotrest123@gmail.com',
      pass: '1111asdf'
    }
  });
  
  var mailOptions = {
    from: 'hotrest123@gmail.com',
    to: 'david.p.hoffmann1@gmail.com',
    subject: 'R Nest Contact Us Message',
    text: 'You have a new R Nest contact us message below:',
    html: output 
  
  };
  console.log(mailOptions);
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  
  });
  res.redirect("/home");
  });
  // GET route for getting all of the posts
  app.get("/api/posts/", function(req, res) {
    db.Post.findAll({})
      .then(function(dbPost) {
        res.json(dbPost);
      });
  });

  // Get route for returning posts of a specific category
  app.get("/api/posts/category/:category", function(req, res) {
    db.Post.findAll({
      where: {
        category: req.params.category
      }
    })
      .then(function(dbPost) {
        res.json(dbPost);
      });
  });

  // Get route for retrieving a single post
  app.get("/api/posts/:id", function(req, res) {
    db.Post.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(function(dbPost) {
        res.json(dbPost);
      });
  });

  // POST route for saving a new post
  app.post("/api/posts", function(req, res) {
    console.log(req.body);
    db.Post.create({
      title: req.body.title,
      email: req.body.email,
      price: req.body.price,
      photo: req.body.photo,
      body: req.body.body,
      category: req.body.category
    })
      .then(function(dbPost) {
        res.json(dbPost);
      });
  });

  // DELETE route for deleting posts
  app.delete("/api/posts/:id", function(req, res) {
    db.Post.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(function(dbPost) {
        res.json(dbPost);
      });
  });

  // PUT route for updating posts
  app.put("/api/posts", function(req, res) {
    db.Post.update(req.body,
      {
        where: {
          id: req.body.id
        }
      })
      .then(function(dbPost) {
        res.json(dbPost);
      });
  });
};
