'use strict';

const postsModel = require('@models/posts');
const usersModel = require('@models/users');
const JalaliMomentService = require('@services/dateService');
const LangService = require('@services/langService');
const postsValidator = require('@validators/posts');
const sessionsModel = require('@models/sessions');

module.exports.index = async (req, res) => {
  let posts = await postsModel.fetchAllPosts();
  // using services
  const presentedPosts = posts.map(post => {
    post.jalali_created_at = new JalaliMomentService(post.created_at).dateToPersian();
    post.views_persian = LangService.numberToPersian(post.views);
    return post;
  });

  res.renderACP('admin/posts', { posts: presentedPosts });
};

module.exports.create = async (req, res) => {
  const sessionData = await sessionsModel.fetchSessions(
    ['errors'],
    req.signedCookies.sessID
  );
  await sessionsModel.updateSessions(null, req.signedCookies.sessID);
  const users = await usersModel.fetchUsers(['id', 'full_name']);
  res.renderACP('admin/posts/create', { users, errors: sessionData?.errors });
};

module.exports.compose = async (req, res) => {
  const postData = {
    title: req.body.title,
    author_id: req.body.author,
    slug: req.body.slug,
    content: req.body.content,
    status: req.body.status
  };

  const validationError = await postsValidator.validate(postData);
  if (validationError.errors.length > 0) {
    try {
      await sessionsModel.updateSessions(
        JSON.stringify(validationError.errors),
        req.signedCookies.sessID
      );
      return res.redirect('/admin/posts/create');
    } catch (e) {
      console.log(e);
    }
  }

  await postsModel.compose(postData);
  res.redirect('/admin/posts');
};

module.exports.delete = async (req, res) => {
  await postsModel.delete(req.params.postID);
  res.redirect('/admin/posts');
};

module.exports.edit = async (req, res) => {
  const users = await usersModel.fetchUsers(['id', 'full_name']);
  const [post] = await postsModel.fetchPost(req.params.postID);
  res.renderACP('admin/posts/edit', {
    post,
    users,
    helpers: {
      isPostAuthor: function(userID, options) {
        return userID === post.author_id
          ? options.fn(this)
          : options.inverse(this);
      },
      isPostStatus: function(status, options) {
        return status === post.status
          ? options.fn(this)
          : options.inverse(this);
      }
    }
  });
};

module.exports.update = async (req, res) => {
  const postData = {
    title: req.body.title,
    author_id: req.body.author,
    slug: req.body.slug,
    content: req.body.content,
    status: req.body.status
  };

  await postsModel.update(postData, req.params.postID);

  res.redirect('/admin/posts');
};
