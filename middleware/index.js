'use strict';
/**
 * Packages
 */
const express = require('express');
const router = express.Router();

/**
 * Middleware
 */
// catch all
router.use(async (req, res, next) => {
  try {
     console.log('middleware');
    next();
  } catch (e) {
    console.error(e);
  }
});

module.exports = router;
