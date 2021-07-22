'use strict';
const homeControllers = require('@controllers/front/home');

class HomeRouter {
  private _express = require('express');
  private _router = this._express.Router();

  constructor() {
    this._router.get('/', homeControllers.index);
    this._router.get('/search',homeControllers.search);
  }

  get router(): any {
    return this._router;
  }
}

module.exports = new HomeRouter().router;
