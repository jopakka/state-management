'use strict';
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();
const port = 3000;

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
    maxAge: 60000
  }
}))

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
app.get('/secret', (req, res) => {
  if (req.session.logged === true)
    res.render('secret');
  else
    res.redirect('form');
});

// Post login
app.post('/login', (req, res) => {
  const userParam = req.body.username;
  const passParam = req.body.password;
  if (userParam === username && passParam === password) {
    req.session.logged = true;
    res.redirect('secret');
  } else {
    req.session.logged = false;
    res.redirect('form');
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
