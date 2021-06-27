'use strict';

const bcrypt = require('bcrypt');

module.exports.hashPassword = async function hashPassword(plainPassword) {
  return await bcrypt.hash(plainPassword, 10);
};
