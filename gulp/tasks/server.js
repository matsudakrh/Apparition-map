var gulp = require("gulp");
var webserver = require('gulp-webserver');
var config = require('../config').path;
var option = require('../config').option;

//ローカルサーバー立ち上げ&自動更新
gulp.task('server', function(){

    return gulp.src( config.publicDir )
        .pipe(webserver( option.server )
    );

});
