'use strict';
const db = require('@database/mysql');

module.exports.fetchAllComments = async () => {
  const [result] = await db.query(
    `SELECT comments.*, posts.title
     FROM comments
     JOIN posts ON posts.id = comments.post_id     
     ORDER BY created_at DESC`
  );
  return result;
};
