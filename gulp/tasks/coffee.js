var gulp = require("gulp");
var coffee = require('gulp-coffee');
var plumber = require('gulp-plumber');
var config = require('../config').option;


gulp.task( 'coffee', function () {
    gulp.src( config.sourceDir + 'coffee/**/*.coffee')
        .pipe(plumber( config.sass.error ))
        .pipe(coffee())
        .pipe(gulp.dest(config.publicDir + 'js/'));
});