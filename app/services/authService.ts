'use strict';

const usersModel = require('@models/users');
const HashService = require('@services/hashService');

module.exports = class AuthService {
  static async login(email, plainPassword) {
    const user = await usersModel.findUserByEmail(email, plainPassword);

    if (!user)
      return false;
    else {
      return await HashService.comparePasswords(plainPassword, user.password) ? user : false;
    }
  }
};
