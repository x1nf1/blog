'use strict';

const AuthService = require('@services/authService');
const userRoles = require('@models/users/userRoles');

module.exports.showLogin = function(req, res) {
  res.renderPage('auth/login', { layout: 'auth' });
};

module.exports.doLogin = async function(req, res) {
  const { email, password } = req.body;

  const user = await AuthService.login(email, password);

  if (!user) {
    req.flash('errors', ['ایمیل یا کلمه عبور معتبر نمی باشد']);
    return res.redirect('/auth/login');
  } else {
    req.session.user = user;
    const pathToRedirect = user.role === userRoles.USER ? '/' : '/admin/dashboard';
    return res.redirect(pathToRedirect);
  }

};

module.exports.showRegister = function(req, res) {
  res.renderPage('auth/register', { layout: 'auth' });
};

module.exports.doRegister = function(req, res) {

};
