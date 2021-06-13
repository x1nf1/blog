'use strict';

const adminRouter = require('@routes/admin');

module.exports = app => {
  app.use('/admin', adminRouter);
};
