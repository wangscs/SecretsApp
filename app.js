// require("dotenv").config();
const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
// const encrypt = require('mongoose-encryption');
// const md5 = require("md5");
// const bcrypt = require('bcrypt');
// const saltRounds = 10;
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(session({
  secret: "The secretest secret.",
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/userDB", {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set("useCreateIndex", true);

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

// Plugin for sessions
userSchema.plugin(passportLocalMongoose);

// Plugin is used for encryption and env keys
// userSchema.plugin(encrypt, {secret: process.env.secret, encryptedFields: ["password"]});

const User = new mongoose.model("User", userSchema);

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser);
passport.deserializeUser(User.deserializeUser);

// ******************************GET REQUESTS**********************************
app.get("/", function(req, res){
  res.render("home");
});

app.get("/login", function(req, res){
  res.render("login");
});

app.get("/register", function(req, res){
  res.render("register");
});

app.get("/secrets", function(req, res){

  console.log("inside the get method for secrets");

  if(req.isAuthenticated()){
    console.log("About to be redirected to secrets");
    res.render("secrets");
  } else {
    res.redirect("/login");
  }
});

app.get("/logout", function(req, res){
  req.logout();
  res.redirect("/");
});

// **********************************POST REQUESTS*****************************
app.post("/login", function(req, res){
  
  // *****************Bcrypt login Method******************
  // const username = req.body.username;
  // const password = req.body.password;
  // User.findOne({email: username}, function(err, foundUser){
  //   if(err){
  //     console.log(err);
  //   } else {
  //     if(foundUser){
  //       bcrypt.compare(password, foundUser.password, function(err, result){
  //         if(result === true){
  //           res.render("secrets");
  //         }
  //       });
  //     } else {
  //       res.send("User not found");
  //     }
  //   }
  // });
  // ******************************************************

  const user = new User({
    username: req.body.username,
    password: req.body.password
  });

  console.log(req.body.username);
  console.log(req.body.password);

  req.login(user, function(err){
    console.log("hi");
    if(err){
      console.log(err);
    } else {
      console.log("hey im in");
      passport.authenticate("local")(req, res, function(){
        console.log("already authed");
        res.redirect("/secrets");
      });
    }
  });
});

app.post("/register", function(req, res){

  // *****************Bcrypt Register Method***************
  // bcrypt.hash(req.body.password, saltRounds, function(err, hash){
  //   //Store hash in password DB
  //   const newUser = new User({
  //     email: req.body.username,
  //     password: hash,
  //   });
  //   newUser.save(function(err){
  //     if(err){
  //       console.log(err);
  //     } else {
  //       res.render("secrets");
  //     }
  //   });
  // });
  // ******************************************************

  console.log("Inside Post register route");

  User.register({username: req.body.username}, req.body.password, function(err, user){

    console.log("Inside user.register heres username" + req.body.username);
    console.log("Heres req.body.password= "+ req.body.password);
    console.log(user);
    if(err){
      console.log(err);
      res.redirect("/register");
    } else {

      console.log("Before passport auth");

      passport.authenticate('local', {failureRedirect: '/'}),
      function(req, res){

        console.log("Inside passport.auth*************");

        res.redirect("/secrets");

        console.log("After redirection**************");
      }(req, res, next);
    }

    console.log("After ifelse statement");
    // res.redirect("/register");
  });

  console.log("bruh user.register never got called");
});



app.listen(3000, function(){
  console.log("Server has started on port 3000.");
});