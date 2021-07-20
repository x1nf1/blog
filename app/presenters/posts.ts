'use strict';

const JalaliMomentService = require('@services/dateService');
const LangService = require('@services/langService');

module.exports = class PostPresenter {
  constructor(private _post) {
  }

  dateToPersian() {
    return new JalaliMomentService(this._post.created_at).dateToPersian();
  }

  numberToPersian() {
    return LangService.numberToPersian(this._post.views);
  }

  excerpt() {
    return this._post.content.split(' ').slice(0, 21).join(' ');
  }

};
