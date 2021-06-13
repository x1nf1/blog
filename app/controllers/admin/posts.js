'use strict';

const postsModel = require('@models/posts');
const { dateToPersian } = require('@services/dateService');
const { toPersianNumber } = require('@services/langService');
module.exports.index = async (req, res, next) => {
  let posts = await postsModel.findAll();
  // using services
  const presentedPosts = posts.map(post => {
    post.jalali_created_at = dateToPersian(post.created_at);
    post.views_persian = toPersianNumber(post.views);
    return post;
  });

  res.render('admin/posts', { layout: 'admin', posts: presentedPosts });
};
