'use strict';
jest.autoMockOff(); // Make the joker stop mocking..

describe('scripts in strings', function () {
  it('finds zero scripts', function () {
    var autoEntrify = require('../autoentrify');
    var html = '<h2 class="title">Hello world</h2><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>'
    expect(autoEntrify.findScriptsInString(html)).toEqual([]);
  });

  it('finds a single hidden script', function () {
    var autoEntrify = require('../autoentrify');
    var html = '<h2 class="title">Hello world</h2><script src="script1.js"></script><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>'
    expect(autoEntrify.findScriptsInString(html)).toEqual(['script1.js']);
  });
  it('finds multiple script sources', function () {
    var autoEntrify = require('../autoentrify');
    var html = '<script src="script1.js"></script><script src="script2.js"></script>'
    expect(autoEntrify.findScriptsInString(html)).toEqual(['script1.js', 'script2.js']);
  });
  it('ignores template scripts and scripts without sources', function () {
    var autoEntrify = require('../autoentrify');
    var html = '<script>var bla = 3</script><script type="text/template"><h1>{{obj.title}}</h1></script>';
    expect(autoEntrify.findScriptsInString(html)).toEqual([]);
  });
});

describe('scripts in files', function () {
  it('should return empty array for nonsense globs', function () {
    var autoEntrify = require('../autoentrify');
    expect(autoEntrify.findScriptsInGlob('nonsense glob')).toEqual([]);
  });
  it('should ignore files that have nothing', function () {
    var autoEntrify = require('../autoentrify');
    expect(autoEntrify.findScriptsInGlob('./testdir/no-scripts.html')).toEqual([]);
  });
  it('finds a single script in a file', function () {
    var autoEntrify = require('../autoentrify');
    expect(autoEntrify.findScriptsInGlob('./testdir/one-script.html')).toEqual(['script1.js']);
  });
  it('finds scripts in multiple files without outputting duplicates', function () {
    var autoEntrify = require('../autoentrify');
    expect(autoEntrify.findScriptsInGlob('./testdir/*.html')).toEqual(['script1.js', 'script2.js', 'script3.js']);
  });
  it('works with an array of globs', function () {
    var autoEntrify = require('../autoentrify');
    var globs = ['./testdir/one-script.html', './testdir/multiple-scripts.html'];
    expect(autoEntrify.findScriptsInGlob(globs)).toEqual(['script1.js', 'script2.js', 'script3.js']);
  });
  it('should work for public version too', function () {
    var autoEntrify = require('../index');
    expect(typeof autoEntrify).toBe('function');
    expect(autoEntrify('./testdir/one-script.html')).toEqual(['script1.js']);
  });

});
