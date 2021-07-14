'use strict';

const gravatar = require('gravatar');

// module.exports.fetchGravatarURL = (email, options) => {
//   return gravatar.url(email, options);
// };

module.exports = class GravatarService {
  static fetchGravatarURL(email, options) {
    return gravatar.url(email, options);
  }
};
