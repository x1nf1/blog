'use strict';

const express = require('express');
const commentsRouter = express.Router();
const commentsController = require('@controllers/admin/comments');

commentsRouter.get('/', commentsController.index);

module.exports = commentsRouter;
