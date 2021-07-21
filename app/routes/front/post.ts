'use strict';
const postController = require('@controllers/front/post');
const commentController = require('@controllers/front/comment');

class PostRouter {
  private _express = require('express');
  private _router = this._express.Router();

  constructor() {
    this._router.get('/:postSlug', postController.showPost);
    this._router.post('/:postSlug/comment', commentController.submit);
  }

  get router(): any {
    return this._router;
  }
}

module.exports = new PostRouter().router;
