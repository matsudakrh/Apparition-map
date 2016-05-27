var gulp = require("gulp");
var react = require('gulp-react');
var config = require('../config').path;

//JavaScript
gulp.task('jsx', function(){
    return gulp.src( config.sourceDir + 'js/**/*.jsx' )
        .pipe(react())
        .pipe(gulp.dest(config.publicDir + 'js'));
});