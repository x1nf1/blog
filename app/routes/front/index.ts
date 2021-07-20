'use strict';
const homeRouter = require('@routes/front/home');
const postRouter = require('@routes/front/post');

class FrontRouter {
  private _express = require('express');
  private _router = this._express.Router();

  constructor() {
    this._router.use('/', homeRouter);
    this._router.use('/p', postRouter);
  }

  get router(): any {
    return this._router;
  }
}

module.exports = new FrontRouter().router;
