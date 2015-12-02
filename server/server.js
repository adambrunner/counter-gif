'use strict';

var koa = require('koa');
var path = require('path');
var koaApp = module.exports = koa();
var config = require('./config');
var App = require('boar-stack').app;

var app = new App(koaApp);
app.addBodyParseMiddleware();
app.addHookMiddleware();

app.loadControllers(path.join(config.root, 'controllers'));


if (!module.parent) {
  app.listen(config.port, config.env);
}
