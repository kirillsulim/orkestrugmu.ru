var gulp = require('gulp'),
    glob = require('glob'),
    handlebars = require('gulp-compile-handlebars'),
    layouts = require('handlebars-layouts'),
    wiredep = require('wiredep').stream,
    rename = require('gulp-rename');

hb = handlebars.Handlebars;
hb.registerHelper(layouts(hb));

module.exports = function() {
  templatesDir = './source/templates/';
  glob('**/*.hbs', {cwd: templatesDir},
    function(er, files){
      files.forEach(function(file){
        try {
          data = require(templatesDir + file.replace('.hbs', '.js'));
        }
        catch(e) {
          data = {}
        }
        gulp.src(templatesDir + file, {base: templatesDir})
          .pipe(handlebars(data, {
            batch: [templatesDir]
          }))
          .pipe(rename(function(path){
            path.extname = '.html';
          }))
          .pipe(wiredep({
            fileTypes: {
              html: {
                replace: {
                  js: function(filePath) {
                    return '<script src="' + 'vendor' + filePath.replace(/.*bower_components/, '') + '"></script>';
                  },
                  css: function(filePath) {
                    return '<link rel="stylesheet" href="' + 'vendor/' + filePath.replace(/.*bower_components/, '') + '"/>';
                  }
                }
              }
            }
          }))
          .pipe(gulp.dest('build'));
      });
  });
};
