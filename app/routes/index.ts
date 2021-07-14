'use strict';
import { Express } from 'express';

const adminRouter = require('@routes/admin');

module.exports = class MainRouter {
  constructor(private _app: Express) {
    this._app.use('/admin', adminRouter);
  }
};
