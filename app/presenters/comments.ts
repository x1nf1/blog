'use strict';

const JalaliMomentService = require('@services/dateService');
const GravatarService = require('@services/gravatarService');

module.exports = class CommentPresenter {
  constructor(private _comment) {
  }

  dateToPersian() {
    return new JalaliMomentService(this._comment.created_at).dateToPersian();
  }

  fetchGravatarURL() {
    return GravatarService.fetchGravatarURL(this._comment.user_email)
  }

};
