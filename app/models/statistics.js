'use strict';

const db = require('../../database/mysql');

exports.totalViews = async () => {
  const [result] = await db.query('SELECT SUM(views) as totalViews FROM posts');
  return result[0].totalViews;
};

exports.totalPosts = async () => {
  const [result] = await db.query('SELECT Count(id) as totalPosts FROM posts');
  return result[0].totalPosts;
};

exports.totalComments = async () => {
  const [result] = await db.query(
    'SELECT Count(id) as totalComments FROM comments'
  );
  return result[0].totalComments;
};

exports.totalUsers = async () => {
  const [result] = await db.query('SELECT Count(id) as totalUsers FROM users');
  return result[0].totalUsers;
};
