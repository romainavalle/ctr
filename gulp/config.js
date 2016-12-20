'use strict';

var join = require('path').join;
var outputRoot = join(process.cwd(), 'static');

module.exports = {
  // Used by autoprefixer.
  browsersSupport: ['last 2 versions', '> 5%'],

  entry: {
    scripts: ['./app/index.js'],
    styles: ['./app/main.styl'],
    images: ['./app/img/**/*.{jpg,png,gif}'],
    icons: ['./app/icons/svg/*.svg']
  },

  output: {
    root: outputRoot,
    path: join(outputRoot, 'build'),
    filename: 'app'
  },

  iconsOutput: {
    folder: './app/icons/',
    filename: 'icons',
    extension: '.svg'
  }
};
