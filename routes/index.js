'use strict';
/**
 * Packages
 */
const express = require('express');
const router = express.Router();

/**
 * Controllers
 */
const middleware = require('../middleware');
const user = require('../controllers/user');

/**
 * Routes
 */

// /v1
router.use(middleware);

// /v1/user
router.post('/user/new', user.addUser);
router.get('/user/:id', user.getUser);

module.exports = router;
