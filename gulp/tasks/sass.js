var gulp = require("gulp");
var sass = require('gulp-sass');
var cssnext = require('gulp-cssnext');
var comb = require('gulp-csscomb');
var minify = require('gulp-cssmin');
var rename = require('gulp-rename');
var plumber = require('gulp-plumber');

var config = require('../config').option;

gulp.task('sass', function(){
    return gulp.src( config.sass.source )
        .pipe(plumber( config.sass.error ))
        .pipe(sass())
        .pipe(cssnext( config.sass.cssnext ))
        .pipe(comb())
        .pipe(gulp.dest( config.sass.public ))
        .pipe(minify())
        .pipe(rename({
            extname: '.min.css'
        }))
        .pipe(gulp.dest( config.sass.public ));
});
