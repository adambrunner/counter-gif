'use strict';

var ControllerFactory = require('boar-stack').lib.controllerFactory;

module.exports = ControllerFactory.create(function(router) {

  router.get('/healthcheck',
    ControllerFactory.load('main/actions/healthcheck/get'));

});
