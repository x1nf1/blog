'use strict';

const userRoles = require('@models/users/userRoles');

module.exports = function authAdminRoute(req, res, next) {
  if (req.session?.user?.role === userRoles.ADMIN) {
    next();
  } else return res.redirect('/');
};
