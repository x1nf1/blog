'use strict';
const express = require('express');
const router = express.Router();

const postsControllers = require('@controllers/admin/posts');
router.get('/', postsControllers.index);
router.get('/create', postsControllers.create);
router.post('/compose', postsControllers.compose);
router.get('/delete/:postID', postsControllers.delete);
router.get('/edit/:postID', postsControllers.edit);
router.post('/update/:postID', postsControllers.update);
module.exports = router;
