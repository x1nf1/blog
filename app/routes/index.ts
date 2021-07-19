'use strict';
import { Express } from 'express';

const adminRouter = require('@routes/admin');
const authRouter = require('@routes/auth');
const authRouteMiddleware = require('@middlewares/auth');
const authAdminRouteMiddleware = require('@middlewares/auth/admin');

module.exports = class MainRouter {
  constructor(private _app: Express) {
    this._app.use('/admin', [authAdminRouteMiddleware], adminRouter);
    this._app.use('/auth', [authRouteMiddleware], authRouter);
  }
};
