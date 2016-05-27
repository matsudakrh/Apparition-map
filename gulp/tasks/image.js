var gulp = require("gulp");
var config = require('../config').path;

gulp.task('images', function(){
    return gulp.src( config.sourceDir + 'images/**/*')
        .pipe(gulp.dest( config.publicDir + 'images/'));
});
