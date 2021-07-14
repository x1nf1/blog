'use strict';

const bcrypt = require('bcrypt');

module.exports = class HashService {
  static async hashPassword(plainPassword: string): Promise<string> {
    return await bcrypt.hash(plainPassword, 10);
  }
};
