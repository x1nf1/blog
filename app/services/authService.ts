'use strict';

const usersModel = require('@models/users');
const userRoles = require('@models/users/userRoles');
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

  static async register(email, password) {
    const doesUserExists: object = await usersModel.findUserByEmail(email);
    if (doesUserExists) return false;

    const userData: object = {
      full_name: 'کاربر ناشناس',
      email,
      password,
      role: userRoles.USER
    };
    const result = await usersModel.createUser(userData);

    return result;
  }
};
