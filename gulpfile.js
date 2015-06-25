var gulp = require('./gulp/')([
  'bower-files',
  'browserify',
  'browser-sync',
  'images',
  'less',
  'templates',
  'watch'
]);

gulp.task('build', ['bower-files', 'images', 'browserify', 'less', 'templates']);
gulp.task('default', ['build', 'watch', 'browser-sync'])  
