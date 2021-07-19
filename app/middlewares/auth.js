'use strict';

const userRoles = require('@models/users/userRoles');

module.exports = function auth(req, res, next) {
  const sessions = req.session;
  if (!'user' in sessions || sessions?.user?.role !== userRoles.ADMIN) {
    return res.redirect('/');
  }
  next();
};
