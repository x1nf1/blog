'use strict';
const postController = require('@controllers/front/post');

class PostRouter {
  private _express = require('express');
  private _router = this._express.Router();

  constructor() {
    this._router.get('/:postSlug', postController.showPost);
  }

  get router(): any {
    return this._router;
  }
}

module.exports = new PostRouter().router;
