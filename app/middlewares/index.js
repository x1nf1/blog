'use strict';

module.exports = app => {
  app.use((req, res, next) => {
    res.renderPage = function renderPage(template, options) {
      res.render(template, { ...options });
    };

    res.renderACP = function (template, options) {
      res.render(template, { layout: 'admin', ...options });
    };
    next();
  });
};
