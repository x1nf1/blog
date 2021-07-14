'use strict';
const dashboardController = require('@controllers/admin/dashboard');

class DashboardRouter {
  private _express = require('express');
  private _router = this._express.Router();

  constructor() {
    this._router.get('/', dashboardController.index);
  }

  get router(): any {
    return this._router;
  }
}

module.exports = new DashboardRouter().router;
