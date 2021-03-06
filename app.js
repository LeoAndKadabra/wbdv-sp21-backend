const express = require("express");
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');

const userRoutes = require("./routes/user");
const commentRoutes = require("./routes/comment");

const bodyParser = require('body-parser');
const methodOverride = require("method-override");

require('dotenv').config()
const dbUrl = process.env.DB_URL
mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("CONNECTION OPEN")
})
.catch(err => {
  console.log("CONNECTION ERROR");
  console.log(err)
});

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Headers',
      'Content-Type, X-Requested-With, Origin');
  res.header('Access-Control-Allow-Methods',
      'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

// ------------ body parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride("_method"));

// ------------- authentication
const User = require('./models/User');
const session = require('express-session');
const passport = require('passport');

const sessionConfig = {
  name: 'session',
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    // secure: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7
  }
}

const LocalStrategy = require('passport-local');

app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// server Apache console logger, will log basic information about requests

app.use(morgan('common'));
app.use("/users", userRoutes);
app.use("/comments", commentRoutes);

app.get("/", (req, res) => {
  res.send("You hit the general GET route!");
});

app.post("/", (req, res) => {
  res.send("You hit the general POST route!");
});

app.use((req, res) => {
  res.status(404).send("NOT FOUND!");
});

app.listen(8080, () => {
  console.log("listening to 8080");
});
