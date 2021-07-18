'use strict';

module.exports = app => {
  app.use((req, res, next) => {
    const errors = req.flash('errors');
    const success = req.flash('success');

    res.renderPage = function renderPage(template, options) {
      res.render(template, { ...options  , errors , success});
    };

    res.renderACP = function(template, options) {
      res.render(template, { layout: 'admin', ...options  , errors , success});
    };
    next();
  });
};
