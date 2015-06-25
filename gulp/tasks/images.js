var gulp = require('gulp');
 
module.exports = function(){
    return gulp.src("./source/img/**/*")
      .pipe(gulp.dest("./build/img/"));
};
