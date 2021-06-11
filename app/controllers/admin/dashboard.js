'use strict';

exports.index = (req, res, next) => {
  res.render('admin/dashboard', { layout: 'admin' });
};
