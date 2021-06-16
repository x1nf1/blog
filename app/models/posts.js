'use strict';

const db = require('@database/mysql');

module.exports.fetchPosts = async () => {
  const [posts] = await db.query(`
  SELECT posts.*, users.full_name
  FROM posts
  JOIN users ON posts.author_id = users.id
  ORDER BY created_at DESC
  `);
  return posts;
};

module.exports.compose = async postData => {
  const [result] = await db.query('INSERT INTO posts SET ?', postData);
  return result;
};
