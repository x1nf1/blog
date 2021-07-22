'use strict';
const postsModel = require('@models/posts');
const PostsPresenter = require('@presenters/posts');
const PostsHelpers = require('@helpers/posts');
const settingsModel = require('@models/settings');

module.exports.index = async function(req, res, next) {
  const settings = {
    websiteTitle: await settingsModel.get('website_title'),
    websiteDescription: await settingsModel.get('website_description'),
    perPage: await settingsModel.get('posts_per_page')
  };
  const page = 'page' in req.query ? Number(req.query.page) : 1;
  const { totalPosts } = await postsModel.countPosts();
  const totalPages = Math.ceil(totalPosts / Number(settings.perPage));
  const pagination = {
    totalPages,
    currentPage: page,
    nextPage: page !== totalPages ? page + 1 : '',
    prevPage: page !== 1 ? page - 1 : ''
  };
  const posts = await postsModel.fetchAllPosts(page, settings.perPage);
  const presentedPosts = posts.map(post => {
    post.presenter = new PostsPresenter(post);
    return post;
  });
  res.renderFront('front/home', {
    posts: presentedPosts, helpers: PostsHelpers, pagination, config: settings
  });
};
