var gulp = require('gulp'),
  less = require('gulp-less')
  browserSync = require('browser-sync');


gulp.task('less', function() {
  gulp.src('app/less/*.less')
    .pipe(less())
    .on('error', function(e){
      console.log(e);
    })
    .pipe(gulp.dest('app/css'));
});

gulp.task('browser-sync', function(){
  var files = [
    'app/**/*.html',
    'app/**/*.css'
  ];

  browserSync.init(files, {
    server: {
      baseDir: './app'
    }
  });
});

gulp.task('watch', function(){
  gulp.watch('app/less/*.less', [
    'less',
    ]);
});
  
