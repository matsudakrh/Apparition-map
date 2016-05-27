var gulp = require("gulp");
var coffee = require('gulp-coffee');

gulp.task( 'config', function () {
    return gulp.src('gulp/config/config.coffee')
        .pipe(coffee())
        .pipe(gulp.dest('gulp/'));
});