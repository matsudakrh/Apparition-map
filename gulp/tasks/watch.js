var gulp = require("gulp");
var config = require('../config').path;

gulp.task('watch', function(){


        gulp.watch(
            config.sourceDir + 'images/**/*',
            ['images']
        );
        gulp.watch(
            config.sourceDir + 'sass/**/*.sass',
            ['sass']
        );
        gulp.watch(
            config.sourceDir + 'json/**/*.json',
            ['json']
        );
        gulp.watch(
            config.sourceDir + 'jade/**/*.jade',
            ['jade']
        );
        gulp.watch(
            config.sourceDir + 'js/**/*.js',
            ['script']
        );
        gulp.watch(
            config.sourceDir + 'js/**/*.jsx' ,
            ['jsx']
        );
        // gulp.watch(
        //     config.sourceDir + 'coffee/**/*.coffee' ,
        //     ['coffee']
        // );

    

});