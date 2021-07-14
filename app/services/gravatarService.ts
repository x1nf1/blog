'use strict';

const gravatar = require('gravatar');

module.exports = class GravatarService {
  static fetchGravatarURL(email: string, options: object) {
    return gravatar.url(email, options);
  }
};
