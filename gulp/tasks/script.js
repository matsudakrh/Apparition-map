var gulp = require("gulp");

var config = require('../config').path;

//JavaScript
gulp.task('script', function(){
    return gulp.src( config.sourceDir + 'js/**/*.js' )
        .pipe(gulp.dest( config.publicDir + 'js'));
});