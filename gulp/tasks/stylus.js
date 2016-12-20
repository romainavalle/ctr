'use strict';

var gulp = require('gulp');
var util = require('gulp-util');
var stylus = require('gulp-stylus');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer-core');
var mqpacker = require('css-mqpacker');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var filter = require('gulp-filter');
var browserSync = require('browser-sync');
var opts = require('../options');
var cfg = require('../config');
var errorNotif = require('../utils/error-notification');

gulp.task('stylus', function() {
  gulp.src(cfg.entry.styles)
    .pipe(plumber())
    // Add sourcemaps if we are in debug mode.
    .pipe(opts.debug ? sourcemaps.init() : util.noop())
    .pipe(stylus({'include css': true}))
    .on('error', errorNotif)
    .pipe(postcss([
      autoprefixer({browsers: cfg.browsersSupport}),
      mqpacker
    ]))
    .pipe(opts.debug ? sourcemaps.write() : util.noop())
    .pipe(rename(cfg.output.filename + '.css'))
    .pipe(gulp.dest(cfg.output.path))
    .pipe(filter('**/*.css'))
    .pipe(browserSync.reload({stream: true}));
});

