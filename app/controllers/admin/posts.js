'use strict';

const postsModel = require('@models/posts');
const { dateToPersian } = require('@services/dateService');

module.exports.index = async (req, res, next) => {
  let posts = await postsModel.findAll();
  // converts date to jalali
  posts = posts.map(post => {
    post.created_at_persian = dateToPersian(post.created_at);
    return post;
  });
  res.render('admin/posts', { layout: 'admin', posts });
};
