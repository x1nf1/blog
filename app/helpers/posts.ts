'use strict';

class PostsHelper {
  getJalaliCreatedAt = function(post) {
    return post.presenter.dateToPersian();
  };

  getPersianViews = function(post) {
    return post.presenter.numberToPersian();
  };
};

module.exports = new PostsHelper();
