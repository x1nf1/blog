'use strict';

const commentsModel = require('@models/comments');
const CommentPresenter = require('@presenters/comments');
const commentsHelpers = require('@helpers/comments');

module.exports.index = async (req, res) => {
  const comments = await commentsModel.fetchAllComments();

  const presentedComments = comments.map(comment => {
    comment.presenter = new CommentPresenter(comment);
    return comment;
  });

  res.render('admin/comments', {
    layout: 'admin',
    comments: presentedComments, helpers : commentsHelpers
  });
};

module.exports.approve = async (req, res) => {
  await commentsModel.approveComment(req.params.commentID);

  res.redirect('/admin/comments');
};

module.exports.reject = async (req, res) => {
  await commentsModel.rejectComment(req.params.commentID);

  res.redirect('/admin/comments');
};

module.exports.delete = async (req, res) => {
  await commentsModel.deleteComment(req.params.commentID);

  res.redirect('/admin/comments');
};
