var gulp = require("gulp");
var config = require('../config').path;


gulp.task( 'library', function () {
    return gulp.src([
        'node_modules/angular/**/angular.min.js',
        'node_modules/jquery/**/jquery.min.js'
    ])
        .pipe(gulp.dest( 'external/js' ));
});