'use strict';
const commentsController = require('@controllers/admin/comments');

class CommentsRouter {
  private _express = require('express');
  private _router = this._express.Router();

  constructor() {
    this._router.get('/', commentsController.index);
    this._router.get('/approve/:commentID', commentsController.approve);
    this._router.get('/reject/:commentID', commentsController.reject);
    this._router.get('/delete/:commentID', commentsController.delete);
  }

  get router(): any {
    return this._router;
  }
}

module.exports = new CommentsRouter().router;
