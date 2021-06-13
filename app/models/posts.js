'use strict';

const db = require('@database/mysql');

module.exports.findAll = async () => {
  const [posts] = await db.query(`
  SELECT posts.*, users.full_name
  FROM posts
  JOIN users ON posts.author_id = users.id`);
  return posts;
};
