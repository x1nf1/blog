'use strict';

const AuthService = require('@services/authService');
const userRoles = require('@models/users/userRoles');
const HashService = require('@services/hashService');

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

module.exports.doRegister = async function(req, res) {
  const { email, password } = req.body;
  const hashedPassword = await HashService.hashPassword(password);
  const result = await AuthService.register(email, hashedPassword);

  if (result.insertId) {
    req.flash('success', ['ثبت نام شما با موفقیت انجام شد، اکنون می توانید وارد شوید']);
    return res.redirect('/auth/login');
  } else {
    req.flash('errors', ['ایمیل وارد شده در سیستم ثبت شده است']);
    return res.redirect('/auth/register');
  }
};

module.exports.logout = async function(req, res) {
  req.session.destroy(error => {
    res.redirect('/auth/login');
  });
};
