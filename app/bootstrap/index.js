'use strict';
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');


module.exports = app => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser(process.env.APP_COOKIE_SECRET));
  app.use(
    session({
      name: 'sessID',
      secret: process.env.APP_COOKIE_SECRET,
      resave: false,
      saveUninitialized: true
    })
  );
  app.use(flash());
  app.engine('handlebars', exphbs());
  app.set('view engine', 'handlebars');
  app.set('views', path.join(__dirname, '../views'));
  app.use('/static', express.static(path.join(__dirname, '../../public')));
};
