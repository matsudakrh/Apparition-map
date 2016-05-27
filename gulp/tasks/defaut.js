var gulp = require("gulp");
var runSequence= require('run-sequence');

gulp.task('default',

    function (callback) {
        return runSequence(
            //'config',
            [
                'library',
                'images',
                'external',
                'sass',
                'jade',
                'jsx',
                'script'
            ],
            [
                'watch',
                'server'
            ],
            callback
        );
    }


);