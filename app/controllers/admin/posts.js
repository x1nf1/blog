'use strict';

const postsModel = require('@models/posts');
const usersModel = require('@models/users');
const { dateToPersian } = require('@services/dateService');
const { toPersianNumber } = require('@services/langService');

module.exports.index = async (req, res) => {
  let posts = await postsModel.fetchPosts();
  // using services
  const presentedPosts = posts.map(post => {
    post.jalali_created_at = dateToPersian(post.created_at);
    post.views_persian = toPersianNumber(post.views);
    return post;
  });

  res.render('admin/posts', { layout: 'admin', posts: presentedPosts });
};

module.exports.create = async (req, res) => {
  const users = await usersModel.fetchUsers(['id', 'full_name']);
  res.render('admin/posts/create', { layout: 'admin', users });
};

module.exports.compose = async (req, res) => {
  const postData = {
    title: req.body.title,
    author_id: req.body.author,
    slug: req.body.slug,
    content: req.body.content,
    status: req.body.status,
  };
  await postsModel.store(postData);
  res.send(req.body);
};
