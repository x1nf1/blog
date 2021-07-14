'use strict';

const gravatar = require('gravatar');

module.exports = class GravatarService {
  static fetchGravatarURL(email, options) {
    return gravatar.url(email, options);
  }
};
