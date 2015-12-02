'use strict';

var path = require('path');

module.exports = {
  root: path.normalize(__dirname),
  env: process.env.NODE_ENV,
  ip: process.env.IP,
  port: process.env.PORT || 3000,

  suite: {
    api: {
      secure: process.env.SECURE_API === 'true',
      port: process.env.SECURE_API === 'true' ? 443 : 80
    }
  },

  client_config: {
    environment: process.env.NODE_ENV,
    baseUrl: process.env.BASE_URL
  }
};
