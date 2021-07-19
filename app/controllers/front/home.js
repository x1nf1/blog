'use strict';

module.exports.index = function(req, res, next) {
  res.renderFront('front/home');
};
