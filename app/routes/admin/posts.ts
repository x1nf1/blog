'use strict';
const postsControllers = require('@controllers/admin/posts');

class PostsRouter {
  private _express = require('express');
  private _router = this._express.Router();

  constructor() {
    this._router.get('/', postsControllers.index);
    this._router.get('/create', postsControllers.create);
    this._router.post('/compose', postsControllers.compose);
    this._router.get('/delete/:postID', postsControllers.delete);
    this._router.get('/edit/:postID', postsControllers.edit);
    this._router.post('/update/:postID', postsControllers.update);
  }

  get router(): any {
    return this._router;
  }
}

module.exports = new PostsRouter().router;
