'use strict';
/**
 * Packages
 */
const mongoose = require('mongoose');

/**
 * Schema
 */
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true
  },
  auth: {
    facebook: String,
    github: String
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
