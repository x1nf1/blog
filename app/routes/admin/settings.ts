'use strict';
const settingsControllers = require('@controllers/admin/settings');

class SettingsRouter {
  private _express = require('express');
  private _router = this._express.Router();

  constructor() {
    this._router.get('/', settingsControllers.index);
    this._router.post('/', settingsControllers.update);
  }

  get router(): any {
    return this._router;
  }
}

module.exports = new SettingsRouter().router;
