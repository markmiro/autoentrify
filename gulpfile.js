// Node modules
var path = require('path');

var browserify  = require('browserify'),
    gulp = require('gulp'),
    gutil = require('gulp-util'),
    addSrc = require('gulp-add-src'),
    jest = require('jest-cli'),
    tap = require('gulp-tap');

var autoEntrify = require('./index');

// TODO: make this work with gulp and browserify
gulp.task('default', function () {
  autoEntrify('test/*.html');
  return;
});
