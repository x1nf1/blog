'use strict';

const commentsModel = require('@models/comments');
const { dateToPersian } = require('@services/dateService');
const { fetchGravatarURL } = require('@services/gravatarService');

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
  });
};
