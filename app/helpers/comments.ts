'use strict';

const commentStatuses = require('@models/comments/commentStatuses');

class CommentsHelpers {
  commentBackground = function(status) {
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
  };

  getJalaliCreatedAt = function(comment) {
    return comment.presenter.dateToPersian();
  };

  getGravatar = function(comment) {
    return comment.presenter.fetchGravatarURL();
  };

}

module.exports = new CommentsHelpers();
