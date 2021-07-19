'use strict';

module.exports = function authRouteMiddleware(req, res, next) {
  const isUserLoggedIn = req.session.user;
  if (isUserLoggedIn) return res.redirect('/');
  else next();
};
