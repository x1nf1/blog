'use strict';

const express = require('express');
const commentsRouter = express.Router();
const commentsController = require('@controllers/admin/comments');

commentsRouter.get('/', commentsController.index);
commentsRouter.get('/approve/:commentID', commentsController.approve);
commentsRouter.get('/reject/:commentID', commentsController.reject);
commentsRouter.get('/delete/:commentID', commentsController.delete);

module.exports = commentsRouter;
