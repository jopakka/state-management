'use strict';
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('./utils/pass');
const session = require('express-session');
const app = express();
const port = 3000;

const loggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect('/form');
  }
};

const username = 'foo';
const password = 'bar';

app.set('views', './views');
app.set('view engine', 'pug');

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 60000,
  },
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.render('home');
});

// Set cookie
app.get('/setCookie/:clr', (req, res) => {
  res.cookie('color', req.params.clr);
  res.send('Cookie set');
});

// Delete cookie
app.get('/deleteCookie', (req, res) => {
  res.clearCookie('color');
  res.send('Cookie deleted');
});

// Get form
app.get('/form', (req, res) => {
  res.render('form');
});

// Get secret
app.get('/secret', loggedIn, (req, res) => {
  res.render('secret');
});

// Post login
app.post('/login', passport.authenticate('local', {failureRedirect: '/form'}),
    (req, res) => {
      console.log('success');
      res.redirect('/secret');
    });

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/form');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
