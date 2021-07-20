'use strict';
const postsModel = require('@models/posts');
const PostsPresenter = require('@presenters/posts');
const PostsHelpers = require('@helpers/posts');

module.exports.index = async function(req, res, next) {
  const posts = await postsModel.fetchAllPosts();
  const presentedPosts = posts.map(post => {
    post.presenter = new PostsPresenter(post);
    return post;
  });
  res.renderFront('front/home', { posts: presentedPosts, helpers: PostsHelpers });
};
