'use strict';

class PostsHelper {
  getJalaliCreatedAt = function(post) {
    return post.presenter.dateToPersian();
  };

  getPersianViews = function(post) {
    return post.presenter.numberToPersian();
  };

  getExcerpt = function(post) {
    return post.presenter.excerpt();
  }
};

module.exports = new PostsHelper();
