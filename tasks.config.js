'use strict';

module.exports = {
  server: {
    filePattern: [
      '{common,server}/**/!(*.spec).{jade,js,json}',
      'package.json',
      'service-info.json'
    ],
    runnable: 'dist/server/server.js',
    environmentVariables: {
      APP_ROOT_PATH: process.cwd() + '/dist/server',
      PORT: process.env.PORT || 9123
    },
    test: {
      environmentVariables: {
        APP_ROOT_PATH: process.cwd() + '/dist/server'
      }
    },
    codeStylePattern: 'server/**/*.js'
  },
  client: {
    heroku: [
      'Procfile',
      'Gemfile',
      'Gemfile.lock',
      '.buildpacks'
    ]
  }
};
