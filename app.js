'use strict';
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 3000;

app.set('views', './views');
app.set('view engine', 'pug');

app.use(cookieParser());

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

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
