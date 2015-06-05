// Node modules
var path = require('path');

var browserify  = require('browserify'),
    gulp = require('gulp'),
    gutil = require('gulp-util'),
    addSrc = require('gulp-add-src'),
    jest = require('jest-cli'),
    tap = require('gulp-tap'),
    mocha = require('gulp-mocha');

var autoEntrify = require('./index');

// TODO: make this work with gulp and browserify
gulp.task('default', function () {
  autoEntrify('test/*.html');
  return;
});

gulp.task('mocha', function() {
    return gulp.src(['test.js'], { read: false })
        .pipe(mocha({ reporter: 'list' }))
        .on('error', gutil.log);
});

gulp.task('watch-mocha', function() {
    gulp.watch(['*.js', '!gulpfile.js', 'testdir/*'], ['mocha']);
});
