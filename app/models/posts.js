'use strict';

const db = require('@database/mysql');

module.exports.fetchAllPosts = async () => {
  const [result] = await db.query(`
  SELECT posts.*, users.full_name
  FROM posts
  JOIN users ON posts.author_id = users.id
  ORDER BY created_at DESC
  `);
  return result;
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
    postID,
  ]);
  return result.affectedRows > 0;
};
