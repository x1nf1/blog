'use strict';
const postsModel = require('@models/posts');
const PostsPresenter = require('@presenters/posts');
const postsHelpers = require('@helpers/posts');
module.exports.showPost = async function(req, res) {
  const post = await postsModel.fetchPostBySlug(req.params.postSlug);
  if (!post) {
    return res.redirect('/404');
  }
  post.presenter = new PostsPresenter(post);
  res.renderPost('front/post', { post, helpers: postsHelpers });
};
