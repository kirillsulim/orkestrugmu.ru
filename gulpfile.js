var gulp = require('gulp'),
  merge = require('gulp-merge'),
  autoprefixer = require('gulp-autoprefixer'),
  less = require('gulp-less'),
  rename = require('gulp-rename'),
  mincss = require('gulp-minify-css'),
  mainBowerFiles = require('main-bower-files'),
  wiredep = require('wiredep').stream,
  googleCdn = require('gulp-google-cdn'),
  browserify = require('browserify'),
  source = require('vinyl-source-stream'),
  transform = require('vinyl-transform'),
  glob = require('glob'),
  handlebars = require('gulp-compile-handlebars'),
  rename = require('gulp-rename'),
  browserSync = require('browser-sync');

 
gulp.task('browserify', function() {
  glob('./source/**/*.js', {}, function(er, files){    
    var b = browserify();
    files.forEach(function(file){
      b.add(file);
    });
    b.bundle()
      .pipe(source('bundle.js'))
      .pipe(gulp.dest('./build/'));
  });  
});


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
  templatesDir = './source/templates/';
  glob('**/*.hbs', 
    {cwd: templatesDir}, 
    function(er, files){
      files.forEach(function(file){
        try {
          data = require(templatesDir + file.replace('.hbs', '.js'));
        }
        catch(e) {
          data = {}
        }
        console.log(data);
        console.log(file);
        gulp.src(templatesDir + file, {base: templatesDir})
          .pipe(handlebars(data, {
            batch: [templatesDir]
          }))
          .pipe(rename(function(path){
            console.log(path);
            path.extname = '.html';
          }))
          .pipe(gulp.dest('build'));
      });
  });
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
  
