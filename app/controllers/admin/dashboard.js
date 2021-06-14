'use strict';

const statisticsModel = require('@models/statistics');

exports.index = async (req, res) => {
  const data = {
    totalViews: await statisticsModel.totalViews(),
    totalPosts: await statisticsModel.totalPosts(),
    totalComments: await statisticsModel.totalComments(),
    totalUsers: await statisticsModel.totalUsers(),
  };
  res.render('admin/dashboard', { layout: 'admin', ...data });
};
