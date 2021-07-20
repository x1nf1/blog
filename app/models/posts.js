'use strict';

const db = require('@database/mysql');

module.exports.fetchAllPosts = async (page = 1, perPage = 10) => {
  const offset = (page - 1) * perPage;
  const [result] = await db.query(`
  SELECT posts.*, users.full_name
  FROM posts
  LEFT JOIN users ON posts.author_id = users.id
  ORDER BY created_at DESC
  LIMIT ${offset},${perPage}
  `);
  return result;
};

module.exports.countPosts = async () => {
  const [result] = await db.query(`
  SELECT COUNT(id) as totalPosts
  FROM posts
  `);
  return result[0];
};

module.exports.fetchPost = async postID => {
  const [result] = await db.query(
    `
 SELECT * FROM posts
 WHERE id = ?
 LIMIT 1
  `,
    postID
  );
  return result;
};

module.exports.fetchPostBySlug = async postSlug => {
  const [result] = await db.query(
    `
 SELECT posts.*, users.full_name
  FROM posts
  LEFT JOIN users ON posts.author_id = users.id
  WHERE slug = ?
  LIMIT 1
  `,
    [postSlug]
  );
  return result[0];
};

module.exports.compose = async postData => {
  const [result] = await db.query('INSERT INTO posts SET ?', postData);
  return result;
};

module.exports.delete = async postID => {
  const [result] = await db.query('DELETE FROM posts WHERE id = ?', [postID]);
  return result.affectedRows;
};

module.exports.update = async (updateFields, postID) => {
  const [result] = await db.query('UPDATE posts SET ? WHERE id = ?', [
    updateFields,
    postID
  ]);
  return result.affectedRows > 0;
};
