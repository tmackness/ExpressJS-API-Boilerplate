'use strict';
/**
 * Packages
 */
const express = require('express');
const router = express.Router();
if (process.env.NODE_ENV !== 'production') {
  const dotenv = require('dotenv');
  dotenv.config();
}
const axios = require('axios');
const discordNotification = require('../modules/discordNotification');

/**
 * Models
 */
const User = require('../models/User');

/**
 * Endpoints
 */

/**
 * Add a new user to the database
 * @param {Object} req.body - The request object
 * @param {string} req.body.firstName - The users first name
 * @param {string} req.body.lastName - The users last name
 * @param {string} req.body.email - The users email
 * POST /v1/user/new
 */
const addUser = async (req, res) => {
  try {
    // save to mongo
    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email
    });

    const save = await newUser.save();
    res.json(save);

  } catch (e) {
    console.error(e);
    discordNotification('error', e)
    res.json({error: "Server error!"})
  }
};

/**
 * Add a new user to the database
 * @param {string} id - The users ID
 * GET /v1/user/:id
 */
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-email').exec();
    res.json(user);
  } catch (e) {
    console.error(e);
    discordNotification('error', e)
    res.json({error: "Server error!"})
  }
};

module.exports = {
    addUser,
    getUser
};
