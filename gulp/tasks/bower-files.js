var gulp = require('gulp'),
    gulpBowerFiles = require('gulp-bower-files');
 
module.exports = function(){
    return gulpBowerFiles()
      .pipe(gulp.dest("./build/vendor/"));
};
