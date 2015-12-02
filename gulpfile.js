'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');
var env = require('gulp-env');
var argv = require('yargs').argv;
var tasksConfig = require('./tasks.config');
var serverTasks = require('boar-tasks-server').getTasks(gulp, tasksConfig);

gulp.task('default', ['start']);

gulp.task('build', function(done) {
  runSequence('set-environment', 'server-copy', done);
});

gulp.task('start', function(done) {
  runSequence([
    'build'
  ], [
    'server-watch',
    'server'
  ], done);
});

gulp.task('test', [
  'server-test',
  'code-style'
]);

// Server Tasks
gulp.task('server', serverTasks.server.start);
gulp.task('server-copy', function() { return serverTasks.server.copy(false); });
gulp.task('server-copy-only-changed', function() { return serverTasks.server.copy(true); });
gulp.task('server-watch', function() {
  gulp.watch(serverTasks.config.server.filePattern, ['server-copy-only-changed']);
});

gulp.task('server-test', ['set-environment', 'server-copy'], serverTasks.server.test);

gulp.task('code-style', ['server-code-style']);
gulp.task('server-code-style', serverTasks.server.codeStyle);
gulp.task('server-jade-code-style', serverTasks.server.jadeCodeStyle);

gulp.task('set-environment', function() {
  var currentEnv;
  if (argv.env) {
    currentEnv = argv.env;
  } else if (argv.staging) {
    currentEnv = 'staging';
  } else if (argv.production) {
    currentEnv = 'production';
  }

  env({ file: 'environments/' + (currentEnv || 'dev') + '.json' });
});
