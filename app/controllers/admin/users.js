'use strict';

const usersModel = require('@models/users');
const sessionsModel = require('@models/sessions');
const userRoles = require('@models/users/userRoles');
const hashService = require('@services/hashService');

module.exports.index = async (req, res) => {
  let users = await usersModel.fetchUsers();

  res.renderACP('admin/users', { users });
};

module.exports.register = async (req, res) => {
  const sessionData = await sessionsModel.fetchSessions(
    ['errors'],
    req.signedCookies.sessID
  );
  await sessionsModel.updateSessions(null, req.signedCookies.sessID);
  const users = await usersModel.fetchUsers(['id', 'full_name']);
  res.renderACP('admin/users/register', { users, errors: sessionData?.errors });
};

module.exports.createUser = async (req, res) => {
  const userData = {
    full_name: req.body.full_name,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
  };

  const updatedUserData = {
    ...userData,
    password: await hashService.hashPassword(userData.password),
  };

  await usersModel.createUser(updatedUserData);
  res.redirect('/admin/users');
};

module.exports.delete = async (req, res) => {
  await usersModel.delete(req.params.userID);
  res.redirect('/admin/users');
};

module.exports.edit = async (req, res) => {
  const [user] = await usersModel.fetchUser(req.params.userID);
  res.renderACP('admin/users/edit', {
    user,
    userRoles,
    helpers: {
      isUserRole: function (role, options) {
        return role === user.role ? options.fn(this) : options.inverse(this);
      },
    },
  });
};

module.exports.update = async (req, res) => {
  const userData = {
    full_name: req.body.full_name,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
  };

  const updatedUserData = {
    ...userData,
    password: await hashService.hashPassword(userData.password),
  };

  await usersModel.update(updatedUserData, req.params.userID);

  res.redirect('/admin/users');
};
