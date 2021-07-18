'use strict';
import { Express } from 'express';

const adminRouter = require('@routes/admin');
const authRouter = require('@routes/auth');

module.exports = class MainRouter {
  constructor(private _app: Express) {
    this._app.use('/admin', adminRouter);
    this._app.use('/auth', authRouter);
  }
};
