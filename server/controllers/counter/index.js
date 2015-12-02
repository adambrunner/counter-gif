'use strict';

var ControllerFactory = require('boar-stack').lib.controllerFactory;

module.exports = ControllerFactory.create(function(router) {

  router.get('/generate/:year/:month/:day/:hour/:minute/:second',
    ControllerFactory.load('counter/actions/generate/get'));

});
