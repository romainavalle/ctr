'use strict';

var gulp = require('gulp');
var browserify = require('browserify');
var watchify = require('watchify');
var vinyl = require('vinyl-source-stream');
var envify = require('envify/custom');
var stringify = require('stringify');
var opts = require('../options');
var cfg = require('../config');
var bundleLogger = require('../utils/time-logger')('bundle');
var errorNotif = require('../utils/error-notification');

gulp.task('browserify', function() {
  var bundler = browserify({
    entries: cfg.entry.scripts,
    cache: {},
    packageCache: {},
    fullPaths: opts.debug,
    debug: opts.debug
  });
  if (opts.watch) {
    bundler = watchify(bundler);
    bundler.on('update', bundle);
  }

  applyTransform(bundler);

  return bundle();

  function bundle() {
    bundleLogger.start();

    return bundler.bundle()
      .on('error', errorNotif)
      .pipe(vinyl(cfg.output.filename + '.js'))
      .pipe(gulp.dest(cfg.output.path))
      .on('end', bundleLogger.end);
  }
});

function applyTransform(bundler) {
  // Allow to target an environment with process.env.NODE_ENV.
  // Ex:
  //   if (process.env.NODE_ENV === 'development') {
  //     console.log('only in dev. Will be removed on prod')
  //   }
  bundler.transform([

      envify({
        NODE_ENV: opts.env
      })
    ]);
}
