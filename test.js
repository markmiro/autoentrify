'use strict';
var assert = require('assert');

describe('scripts in strings', function () {
  it('finds zero scripts', function () {
    var autoEntrify = require('./autoentrify');
    var html = '<h2 class="title">Hello world</h2><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>'
    assert.deepEqual(autoEntrify.findScriptsInString(html), []);
  });
  it('finds a single hidden script', function () {
    var autoEntrify = require('./autoentrify');
    var html = '<h2 class="title">Hello world</h2><script src="script1.js"></script><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>'
    assert.deepEqual(autoEntrify.findScriptsInString(html), ['script1.js']);
  });
  it('finds multiple script sources', function () {
    var autoEntrify = require('./autoentrify');
    var html = '<script src="script1.js"></script><script src="script2.js"></script>'
    assert.deepEqual(autoEntrify.findScriptsInString(html), ['script1.js', 'script2.js']);
  });
  it('ignores template scripts and scripts without sources', function () {
    var autoEntrify = require('./autoentrify');
    var html = '<script>var bla = 3</script><script type="text/template"><h1>{{obj.title}}</h1></script>';
    assert.deepEqual(autoEntrify.findScriptsInString(html), []);
  });
});

describe('scripts in files', function () {
  it('should return empty array for nonsense globs', function () {
    var autoEntrify = require('./autoentrify');
    assert.deepEqual(autoEntrify.findScriptsInGlob('nonsense glob'), []);
  });
  it('should ignore files that have nothing', function () {
    var autoEntrify = require('./autoentrify');
    assert.deepEqual(autoEntrify.findScriptsInGlob('./testdir/no-scripts.html'), []);
  });
  it('finds a single script in a file', function () {
    var autoEntrify = require('./autoentrify');
    assert.deepEqual(autoEntrify.findScriptsInGlob('./testdir/one-script.html'), ['script1.js']);
  });
  it('finds scripts in multiple files without outputting duplicates', function () {
    var autoEntrify = require('./autoentrify');
    assert.deepEqual(autoEntrify.findScriptsInGlob('./testdir/*.html'), ['script1.js', 'script2.js', 'script3.js']);
  });
  it('works with an array of globs', function () {
    var autoEntrify = require('./autoentrify');
    var globs = ['./testdir/one-script.html', './testdir/multiple-scripts.html'];
    assert.deepEqual(autoEntrify.findScriptsInGlob(globs), ['script1.js', 'script2.js', 'script3.js']);
  });
  it('should work for public version too', function () {
    var autoEntrify = require('./index');
    assert.deepEqual(typeof autoEntrify, 'function');
    assert.deepEqual(autoEntrify('./testdir/one-script.html'), ['script1.js']);
  });
});

describe('Works with browserify', function () {
  var browserify = require('browserify');
  var autoEntrify = require('./index');
  it('should be able to add entries to browserify', function () {
    var b = browserify();
    b.add('./testdir/script1.js');
    b.bundle().pipe(process.stdout);
  });
});
