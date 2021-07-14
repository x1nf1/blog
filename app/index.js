'use strict';
const express = require('express');
const app = express();
const MainRouter = require('@routes');

require('./bootstrap')(app);
require('@middlewares')(app);
new MainRouter(app);

module.exports = () => {
  const port = process.env.APP_PORT;
  app.listen(port, () => {
    console.log(`App is Running on Port ${port}`);
  });
};
