var fs = require('fs');
var _ = require('underscore');
var globby = require('globby');
var cheerio = require('cheerio');

exports.findScriptsInString = function (html) {
  var $ = cheerio.load(html);
  return $('script').map(function () {
    return $(this).attr('src');
  }).get();
};

exports.findScriptsInGlob = function (glob) {
  var files = globby.sync(glob);
  var foundScripts = [];
  _.each(files, function (file) {
    var htmlStr = fs.readFileSync(file, 'utf8');
    foundScripts = foundScripts.concat(exports.findScriptsInString(htmlStr));
  });
  return _.unique(foundScripts);
};
