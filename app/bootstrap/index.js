'use strict';
const express = require('express');
const session = require('express-session');
const MYSQLStore = require('express-mysql-session')(session);
const db = require('@database/mysql');
const cookieParser = require('cookie-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const middlewares = require('@middlewares');

const sessionStore = new MYSQLStore({}, db);

module.exports = app => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser(process.env.APP_COOKIE_SECRET));
  app.use(
    session({
      name: 'sessID',
      secret: process.env.APP_COOKIE_SECRET,
      store: sessionStore,
      resave: false,
      saveUninitialized: true,
    })
  );
  app.engine('handlebars', exphbs());
  app.set('view engine', 'handlebars');
  app.set('views', path.join(__dirname, '../views'));
  app.use('/static', express.static(path.join(__dirname, '../../public')));
};
