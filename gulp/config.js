(function() {
  var baseConfig, notify;

  baseConfig = {
    sourceDir: 'source/',
    publicDir: 'public/',
    root: this.publicDir,
    gulpRequireSource: '../../source/'
  };

  notify = require('gulp-notify');

  module.exports = {
    path: baseConfig,
    option: {
      external: {
        publicJS: baseConfig.publicDir + 'js/'
      },
      server: {
        livereload: true,
        root: baseConfig.publicDir,
        port: 8080,
        open: false,
        directoryListing: false,
        https: false
      },
      meta: {
        basePath: baseConfig.gulpRequireSource + 'jade/data/meta.json'
      },
      sass: {
        "public": baseConfig.publicDir + 'css/',
        source: baseConfig.sourceDir + 'sass/**/*.sass',
        error: {
          errorHandler: notify.onError("Error: <%= error.message %>")
        },
        cssnext: {
          browser: ["last 3 versions", "ie >= 9"],
          features: {
            customProperties: false,
            calc: true,
            customMedia: false,
            mediaQueriesRange: false,
            autoprefixer: true,
            "import": true,
            fallbacks: true
          }
        }
      },
      jade: {
        src: [baseConfig.sourceDir + 'jade/**/*.jade', '!' + baseConfig.sourceDir + 'jade/component/*.jade', '!' + baseConfig.sourceDir + 'jade/**/_*.jade'],
        "public": baseConfig.publicDir,
        base: baseConfig.sourceDir + 'jade/',
        option: {
          pretty: true
        }
      }
    }
  };

}).call(this);
