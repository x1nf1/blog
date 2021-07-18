'use strict';
const authControllers = require('@controllers/auth');

class AuthRouter {
  private _express = require('express');
  private _router = this._express.Router();

  constructor() {
    this._router.get('/login', authControllers.showLogin);
    this._router.post('/login', authControllers.doLogin);
    this._router.get('/register', authControllers.showRegister);
    this._router.post('/register', authControllers.doRegister);
  }

  get router(): any {
    return this._router;
  }
}

module.exports = new AuthRouter().router;
