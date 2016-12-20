'use strict';

var gulp = require('gulp');
var svgmin = require('gulp-svgmin');
var svgstore = require('gulp-svgstore');
var cheerio = require('gulp-cheerio');
var rename = require('gulp-rename');
var opts = require('../options');
var cfg = require('../config');

gulp.task('icons', function() {

  gulp
    .src(cfg.entry.icons)
    .pipe(svgmin())
    .pipe(svgstore({
      inlineSvg: true,
      emptyFills: true,
    }))
    .pipe(cheerio({
      run: function($) {
        $('title').remove();

        var props = ['fill', 'fill-opacity', 'stroke', 'fill-rule'];
        for (var i = 0; i < props.length; i++){
          var prop = props[i];
          $('[' + prop + ']').removeAttr(prop);
        }
        $(this).addClass('icon');
      }
    }))
    .pipe(rename(function(path) {
      path.basename = cfg.iconsOutput.filename;
      path.extname = cfg.iconsOutput.extension;
    }))
    .pipe(gulp.dest(cfg.iconsOutput.folder));
});