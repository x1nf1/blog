'use strict';

const postsModel = require('@models/posts');

module.exports.index = async (req, res, next) => {
  const posts = await postsModel.findAll();
  res.render('admin/posts', { layout: 'admin', posts });
};
