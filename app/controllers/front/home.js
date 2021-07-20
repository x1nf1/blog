'use strict';
const postsModel = require('@models/posts');
const PostsPresenter = require('@presenters/posts');
const PostsHelpers = require('@helpers/posts');

module.exports.index = async function(req, res, next) {
  const page = 'page' in req.query ? Number(req.query.page) : 1;
  const perPage = 10;
  const { totalPosts } = await postsModel.countPosts();
  const totalPages = Math.ceil(totalPosts / perPage);
  const pagination = {
    totalPages,
    currentPage: page,
    nextPage: page !== totalPages ? page + 1 : '',
    prevPage: page !== 1 ? page - 1 : '',
  };
  const posts = await postsModel.fetchAllPosts(page, perPage);
  const presentedPosts = posts.map(post => {
    post.presenter = new PostsPresenter(post);
    return post;
  });
  res.renderFront('front/home', {
    posts: presentedPosts, helpers: PostsHelpers, pagination
  });
};
