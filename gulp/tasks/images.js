'use strict';

/**
 * WIP
 */

var gulp = require('gulp');
var util = require('gulp-util');
var plumber = require('gulp-plumber');
var filter = require('gulp-filter');
var browserSync = require('browser-sync');
var opts = require('../options');
var cfg = require('../config');
var errorNotif = require('../utils/error-notification');
var pngcrush = require('pngcrush');
var pngquant = require('pngquant');
var imagemin = require('gulp-imagemin')({
    use: [pngcrush(),pngquant()]
});



gulp.task('images', function() {
  gulp.src(cfg.entry.images)
    .pipe(imagemin)
    .on('error', errorNotif)
    .pipe(gulp.dest(cfg.output.path))
    // .pipe(filter('**/*.{png,jpg,gif}}'))
    .pipe(browserSync.reload({stream: true}));
});
