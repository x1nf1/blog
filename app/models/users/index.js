'use strict';

const db = require('@database/mysql');

module.exports.fetchUsers = async (columns = []) => {
  const sqlColumns = columns.length == 0 ? '*' : columns.join(',');
  const [users] = await db.query(`SELECT ${sqlColumns} FROM users`);
  return users;
};

module.exports.fetchUser = async userID => {
  const [result] = await db.query(
    `
 SELECT * FROM users
 WHERE id = ?
 LIMIT 1
  `,
    userID
  );
  return result;
};

module.exports.createUser = async userData => {
  const [result] = await db.query('INSERT INTO users SET ?', userData);
  return result;
};

module.exports.delete = async userID => {
  const [result] = await db.query('DELETE FROM users WHERE id = ?', [userID]);
  return result.affectedRows;
};

module.exports.update = async (updateFields, userID) => {
  const [result] = await db.query('UPDATE users SET ? WHERE id = ?', [
    updateFields,
    userID,
  ]);
  return result.affectedRows > 0;
};
