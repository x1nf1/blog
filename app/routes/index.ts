'use strict';
import { Express } from 'express';

const adminRouter = require('@routes/admin');
const authRouter = require('@routes/auth');
const authMiddleware = require('@middlewares/auth');

module.exports = class MainRouter {
  constructor(private _app: Express) {
    this._app.use('/admin', [authMiddleware], adminRouter);
    this._app.use('/auth', authRouter);
  }
};
