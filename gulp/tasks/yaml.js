'use strict';

var gulp = require('gulp');
var yaml = require('gulp-yaml');
var fs = require('fs');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var opts = require('../options');
var cfg = require('../config');
var errorNotif = require('../utils/error-notification');

gulp.task('yaml', function() {
  
    var langs = fs.readdirSync('./app/lang/');

    for (var i = 0; i < langs.length; i++){
        var lang = langs[i];
        var langNoExt = lang.split('.')[0];

        gulp.src('./app/lang/' + lang)
            .pipe(yaml())
            .pipe(gulp.dest('./static/json/'));

    }
});

