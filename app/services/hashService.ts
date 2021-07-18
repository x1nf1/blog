'use strict';

const bcrypt = require('bcrypt');

module.exports = class HashService {
  static async hashPassword(plainPassword: string): Promise<string> {
    return await bcrypt.hash(plainPassword, 10);
  }

  static async comparePasswords(plainPassword, hashedPassword): Promise<string> {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
};
