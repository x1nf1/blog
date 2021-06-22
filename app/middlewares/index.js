'use strict';

module.exports = app => {
  app.use((req, res, next) => {
    res.renderACP = function (template, options) {
      res.render(template, { layout: 'admin', ...options });
    };
    next();
  });
};
