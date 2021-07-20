'use strict';
const postsModel = require('@models/posts');
const PostsPresenter = require('@presenters/posts');
const postsHelpers = require('@helpers/posts');
const usersModel = require('@models/users');
const GravatarService = require('@services/gravatarService');

module.exports.showPost = async function(req, res) {
  const post = await postsModel.fetchPostBySlug(req.params.postSlug);
  if (!post) {
    return res.redirect('/404');
  }
  const author = await usersModel.fetchUser(post.author_id);
  post.author = author[0];
  post.author.gravatar = GravatarService.fetchGravatarURL(author.email);
  post.presenter = new PostsPresenter(post);
  res.renderPost('front/post', { post, helpers: postsHelpers });
};
