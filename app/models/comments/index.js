'use strict';
const db = require('@database/mysql');
const commentStatuses = require('@models/comments/commentStatuses');

module.exports.fetchAllComments = async () => {
  const [result] = await db.query(
    `SELECT comments.*, posts.title
     FROM comments
     JOIN posts ON posts.id = comments.post_id     
     ORDER BY created_at DESC`
  );
  return result;
};

module.exports.approveComment = async commentID => {
  const [result] = await db.query(
    'UPDATE comments SET status = ? WHERE id = ? LIMIT 1',

    [commentStatuses.APPROVED, commentID]
  );
  return result.affectedRows > 0;
};

module.exports.rejectComment = async commentID => {
  const [result] = await db.query(
    'UPDATE comments SET status = ? WHERE id = ? LIMIT 1',

    [commentStatuses.REJECTED, commentID]
  );
  return result.affectedRows > 0;
};

module.exports.deleteComment = async commentID => {
  const [result] = await db.query(
    'DELETE FROM comments WHERE id = ? LIMIT 1',

    [commentID]
  );
  return result.affectedRows > 0;
};
