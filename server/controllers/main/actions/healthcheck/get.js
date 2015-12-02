'use strict';

var getVersion = function() {
  var packageJson = require('../../../../../package.json');
  return packageJson.version;
};

module.exports = function*() {
  this.status = 200;
  this.body = {
    success: true,
    version: getVersion()
  };
};
