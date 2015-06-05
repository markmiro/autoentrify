var browserify  = require('browserify'),
    gulp = require('gulp'),
    through2 = require('through2'),
    vinyl = require('vinyl');

gulp.task('default', function () {
  gulp.src('test/file.html')
    .pipe(gulp.dest('./output'));
});
