'use strict';

const adminRouter = require('./admin/admin');

module.exports = app => {
  app.use('/admin', adminRouter);
};
