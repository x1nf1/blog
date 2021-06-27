'use strict';

const express = require('express');
const router = express.Router();
const usersControllers = require('@controllers/admin/users');

router.get('/', usersControllers.index);
router.get('/register', usersControllers.register);
router.post('/create-user', usersControllers.createUser);
router.get('/delete/:userID', usersControllers.delete);
router.get('/edit/:userID', usersControllers.edit);
router.post('/update/:userID', usersControllers.update);

module.exports = router;
