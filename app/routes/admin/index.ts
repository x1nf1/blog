'use strict';

const dashboardRouter = require('./dashboard');
const postsRouter = require('./posts');
const commentsRouter = require('./comments');
const usersRouter = require('./users');
const settingsRouter = require('./settings');

class AdminRouter {
  private _express = require('express');
  private _router = this._express.Router();

  constructor() {
    this._router.use('/dashboard', dashboardRouter);
    this._router.use('/posts', postsRouter);
    this._router.use('/comments', commentsRouter);
    this._router.use('/users', usersRouter);
    this._router.use('/settings', settingsRouter);
  }

  get router(): any {
    return this._router;
  }
}

module.exports = new AdminRouter().router;
