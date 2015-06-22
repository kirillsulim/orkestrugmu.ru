var gulp = require('gulp'),
  merge = require('gulp-merge'),
  autoprefixer = require('gulp-autoprefixer'),
  less = require('gulp-less'),
  rename = require('gulp-rename'),
  mincss = require('gulp-minify-css'),
  mainBowerFiles = require('main-bower-files'),
  wiredep = require('wiredep').stream,
  googleCdn = require('gulp-google-cdn'),
  browserSync = require('browser-sync');



gulp.task('less', function() {
  return gulp.src('source/style/*.less')
    .pipe(less())
    .pipe(autoprefixer('last 2 versions'))
    .on('error', function(e){
      console.log(e);
    })
    .pipe(rename({suffix: '.min'}))
    .pipe(mincss({keepBreaks: true}))
    .pipe(gulp.dest('build/css'));
});

gulp.task('templates', function() {
  return gulp.src('source/templates/**/*.html')
    .pipe(wiredep({optional: 'configuration',goes: 'here'}))
    .pipe(googleCdn(require('./bower.json')))
    .pipe(gulp.dest('build'));
});

gulp.task('browser-sync', function(){
  var files = [
    'build/**/*.html',
    'build/**/*.css',
    'build/**/*.js'
  ];

  return browserSync.init(files, {
    server: {
      baseDir: './build'
    }
  });
});

gulp.task('watch', function(){
  gulp.watch('source/style/*.less', [
    'less'
    ]);

  gulp.watch('source/templates/*', [
    'templates'
  ]);
});
  
