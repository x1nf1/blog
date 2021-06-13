'use strict';

const db = require('@database/mysql');

module.exports.findAll = async () => {
  const [posts] = await db.query('SELECT * FROM posts');
  return posts;
};
