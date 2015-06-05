var browserify  = require('browserify'),
    gulp = require('gulp'),
    gutil = require('gulp-util'),
    mocha = require('gulp-mocha');

gulp.task('default', function (done) {
  // Normally we would put requires here
  var tap = require('gulp-tap');
  var browserify = require('browserify');
  var source = require('vinyl-source-stream');
  var buffer = require('vinyl-buffer');
  var autoEntrify = require('./index');

  var plusses = 0;

  // TODO: Try to have an API where I can use it kinda like this:
  // return autoEntrify('glob/*.html', { /* browserifyOptions? */ })
  //   // I might wanna use browserify methods: https://github.com/substack/node-browserify#methods
  //   .pipe(buffer())
  //   // I want to be able to rename
  //   .pipe(rename(function (path) {
  //     path.dirname += "/ciao";
  //   }))
  //   // I want to do gulpy things
  //   .pipe(sourcemaps.init({loadMaps: true}))
  //     .pipe(uglify())
  //   .pipe(sourcemaps.write('./'))
  //   .pipe(gulp.dest('./output'));

  var scripts = autoEntrify('./testdir/*.html');
  scripts.forEach(function (scriptName) {
    var b = browserify();
    b.add('./testdir/'+scriptName);
    b.bundle()
      .pipe(source(scriptName))
      .pipe(buffer())
      .pipe(gulp.dest('./output/js'))
      .pipe(tap(function () {
        plusses++;
        if (plusses === scripts.length) done();
      }));
  });
});

gulp.task('mocha', function() {
    return gulp.src(['test.js'], { read: false })
        .pipe(mocha({ reporter: 'list' }))
        .on('error', gutil.log);
});

gulp.task('watch-mocha', function() {
    gulp.watch(['*.js', '!gulpfile.js', 'testdir/*'], ['mocha', 'default']);
});
