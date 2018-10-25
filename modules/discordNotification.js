'use strict';
/**
 * Packages
 */
if (process.env.NODE_ENV === 'development') {
  const dotenv = require('dotenv');
  dotenv.config();
}
const axios = require('axios');
const chalk = require('chalk');
const config = require('../config');

/**
 * Discord Notification
 */
const discordNotification = async (channel, msg) => {
  let webhookUrl;
  const discordWebhooks = {
    // channel
    "error": config.discord.channel.error,
    "notification": config.discord.channel.notification
  };
  for (const [key, value] of Object.entries(discordWebhooks)) {
    if (key === channel) {
      // is there a better way then .push into array?
      webhookUrl = value;
      break;
    }
  }
console.log(webhookUrl);

  try {
    if (channel !== 'notification') {
      // msg is object not a string like the rest
      const data = {
        "username": "API",
        "avatar_url": 'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678069-sign-error-512.png',
        "content": msg.name + ": " + msg.message,
        "embeds": [{
          "fields": [
            {
              "name": "Error Type",
              "value": msg.name,
              "inline": true
            }
          ],
          "title": "Stack Trace",
          "description": msg.stack,
        }]
      };

      const postDiscord = await axios.post(webhookUrl, data);
      if (postDiscord.status === 204) {
        console.log('Discord notification sent.');
      } else {
        console.log('Discord notifcation error');
        throw new Error('Discord notifcation error');
      }

    } else {

      const data = {
        "username": "API",
        "avatar_url": 'https://cdn4.iconfinder.com/data/icons/web-icons-19/711/notification-icon-tm-512.png',
        "content": msg.message
      };

      const postDiscord = await axios.post(webhookUrl, data);

      if (postDiscord.status === 204) {
        console.log('Discord notification sent.');
      } else {
        console.log('Discord notifcation error');
        throw new Error('Discord notifcation error');
      }

    }

  } catch (error) {
    console.log(`${error.name}: ${error.message}. Part of response from server: ${error.config}. Stack Trace: ${error.stack}`); // , error.stack?
  }

}
module.exports = discordNotification;
