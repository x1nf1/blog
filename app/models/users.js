'use strict';

const db = require('@database/mysql');

module.exports.fetchUsers = async (columns = []) => {
  const sqlColumns = columns.length == 0 ? '*' : columns.join(',');
  const [users] = await db.query(`SELECT ${sqlColumns} FROM users`);
  return users;
};
