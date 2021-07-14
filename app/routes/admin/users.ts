'use strict';
const usersControllers = require('@controllers/admin/users');

class UsersRouter {
  private _express = require('express');
  private _router = this._express.Router();

  constructor() {
    this._router.get('/', usersControllers.index);
    this._router.get('/register', usersControllers.register);
    this._router.post('/create-user', usersControllers.createUser);
    this._router.get('/delete/:userID', usersControllers.delete);
    this._router.get('/edit/:userID', usersControllers.edit);
    this._router.post('/update/:userID', usersControllers.update);
  }

  get router(): any {
    return this._router;
  }
}

module.exports = new UsersRouter().router;
