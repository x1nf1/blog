'use strict';
const express = require('express');
const router = express.Router();

const postsControllers = require('@controllers/admin/posts');
router.get('/', postsControllers.index);
router.get('/create', postsControllers.create);
router.post('/compose', postsControllers.compose);

module.exports = router;
