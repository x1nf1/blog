'use strict';

const commentsModel = require('@models/comments');
const { dateToPersian } = require('@services/dateService');
const { fetchGravatarURL } = require('@services/gravatarService');
const commentStatuses = require('@models/comments/commentStatuses');

module.exports.index = async (req, res) => {
  const comments = await commentsModel.fetchAllComments();

  const presentedComments = comments.map(comment => {
    comment.jalali_created_at = dateToPersian(comment.created_at);
    comment.gravatar = fetchGravatarURL(comment.user_email);
    return comment;
  });

  res.render('admin/comments', {
    layout: 'admin',
    comments: presentedComments,
    helpers: {
      commentBackground: function (status) {
        switch (status) {
          case commentStatuses.APPROVED:
            return 'alert-success';
          case commentStatuses.REJECTED:
            return 'alert-danger';
          case commentStatuses.REVIEW:
            return 'alert-info';
          default:
            break;
        }
      },
    },
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
