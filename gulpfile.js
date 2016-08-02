var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var watchify = require('watchify');
var babel = require('babelify');
var uglify = require('gulp-uglify');
var config = require('./config.json');
var concat = require('gulp-concat');
var uglifyConf = {
    compress: {
        drop_console: true,
        dead_code: true
    }
};

function compile(watch) {
    var bundler = watchify(browserify('./ui/index.js', { debug: true }).transform(babel));

    function rebundle() {
        bundler.bundle()
            .on('error', function(err) { console.error(err); this.emit('end'); })
            .pipe(source('index.js'))
            .pipe(buffer())
            .pipe(sourcemaps.init({ loadMaps: true }))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest('./public'));
    }

    if (watch) {
        bundler.on('update', function() {
          console.log('-> bundling...');
          rebundle();
        });
    }

    rebundle();
}

function watch() {
    return compile(true);
};

function production() {
    return gulp.src('./public/index.js')
        .pipe(concat('index.' + config.assetVersion + '.min.js'))
        .pipe(uglify(uglifyConf))
        .pipe(gulp.dest('./public'));
}

gulp.task('build', function() { return compile(); });
gulp.task('watch', function() { return watch(); });
gulp.task('production', function() { return production(); });

gulp.task('default', ['watch']);
