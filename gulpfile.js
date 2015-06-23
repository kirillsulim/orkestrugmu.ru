var gulp = require('./gulp/')([
  'browserify',
  'browser-sync',
  'less',
  'templates',
  'watch'
]);

gulp.task('build', ['browserify', 'less', 'templates']);
gulp.task('default', ['build', 'watch', 'browser-sync'])  
