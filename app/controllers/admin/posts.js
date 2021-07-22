'use strict';

const postsModel = require('@models/posts');
const usersModel = require('@models/users');
const PostPresenter = require('@presenters/posts');
const postsHelpers = require('@helpers/posts');
const postsValidator = require('@validators/posts');
const uploadService = require('@services/uploadService');

module.exports.index = async (req, res) => {
  let posts = await postsModel.fetchAllPosts();

  const presentedPosts = posts.map(post => {
    post.presenter = new PostPresenter(post);
    return post;
  });

  res.renderACP('admin/posts', {
    posts: presentedPosts, helpers: postsHelpers
  });
};

module.exports.create = async (req, res) => {
  const users = await usersModel.fetchUsers(['id', 'full_name']);
  res.renderACP('admin/posts/create', { users });
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
  if (validationError.length > 0) {
    req.flash('errors', validationError);
    return res.redirect('/admin/posts/create');
  } else {
    const fileName = await uploadService.upload(req.files?.thumbnail);
    postData.thumbnail = fileName;
    await postsModel.compose(postData);
    req.flash('success', 'مطلب با موفقیت ایجاد شد');
    return res.redirect('/admin/posts');
  }
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
