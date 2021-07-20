'use strict';

const GravatarService = require('@services/gravatarService');

module.exports = app => {
  app.use((req, res, next) => {
    const errors = req.flash('errors');
    const success = req.flash('success');
    let user = null;

    if (req.session.user) {
      user = req.session.user;
      user.gravatar = GravatarService.fetchGravatarURL(user.email);
    }

    res.renderPage = function renderPage(template, options) {
      res.render(template, { ...options, errors, success });
    };

    res.renderACP = function(template, options) {
      res.render(template, { layout: 'admin', ...options, errors, success, user });
    };

    res.renderFront = function(template, options) {
      res.render(template, { layout: 'home', ...options });
    };

    res.renderPost = function(template, options) {
      res.render(template, { layout: 'post', ...options });
    };
    next();
  });
};
